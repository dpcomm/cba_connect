import { DropLectureUseCase } from "@application/lecture/DropLectureUseCase";
import { EnrollLectureUseCase } from "@application/lecture/EnrollLectureUseCase";
import { GetLectureUseCase } from "@application/lecture/GetLectureUseCase";
import { GetMyEnrolledLectureIdUseCase } from "@application/lecture/GetMyEnrolledLectureIdUseCase";
import { Lecture } from "@domain/lecture/Lecture";
import { container } from "@shared/di/container";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export function useLectureDetailViewModel() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params.id);

  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [myEnrolledId, setMyEnrolledId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type: "CONFIRM_ENROLL" | "CONFIRM_DROP" | "SUCCESS" | "ERROR";
  }>({
    visible: false,
    title: "",
    message: "",
    type: "ERROR",
  });

  const getLectureUseCase = container.resolve(GetLectureUseCase);
  const getMyEnrolledUseCase = container.resolve(GetMyEnrolledLectureIdUseCase);
  const enrollLectureUseCase = container.resolve(EnrollLectureUseCase);
  const dropLectureUseCase = container.resolve(DropLectureUseCase);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedLecture, enrolledId] = await Promise.all([
        getLectureUseCase.execute(id),
        getMyEnrolledUseCase.execute(),
      ]);
      setLecture(fetchedLecture);
      setMyEnrolledId(enrolledId);
    } catch (error) {
      console.error("Failed to load lecture detail:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) load();
  }, [id, load]);

  const showModal = (
    title: string,
    message: string,
    type: "CONFIRM_ENROLL" | "CONFIRM_DROP" | "SUCCESS" | "ERROR",
  ) => {
    setModalState({ visible: true, title, message, type });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, visible: false }));
    if (modalState.type === "SUCCESS") {
      router.back();
    }
  };

  const handleEnroll = () => {
    if (!lecture) return;
    if (myEnrolledId !== null && myEnrolledId !== lecture.id) {
      showModal("알림", "이미 다른 강의를 신청하셨습니다.", "ERROR");
      return;
    }
    showModal(
      "강의 신청",
      `'${lecture.title}'\n강의를 신청하시겠습니까?`,
      "CONFIRM_ENROLL",
    );
  };

  const handleDrop = () => {
    showModal("신청 취소", "수강 신청을 취소하시겠습니까?", "CONFIRM_DROP");
  };

  const confirmAction = async () => {
    if (modalState.type === "CONFIRM_ENROLL") {
      setIsLoading(true);
      try {
        await enrollLectureUseCase.execute(id);
        setModalState((prev) => ({ ...prev, visible: false }));
        setTimeout(() => {
          showModal("신청 완료", "강의 신청이 완료되었습니다.", "SUCCESS");
        }, 100);
      } catch (error: any) {
        showModal("오류", error.message || "신청에 실패했습니다.", "ERROR");
      } finally {
        setIsLoading(false);
      }
    } else if (modalState.type === "CONFIRM_DROP") {
      setIsLoading(true);
      try {
        await dropLectureUseCase.execute(id);
        setModalState((prev) => ({ ...prev, visible: false }));
        setTimeout(() => {
          showModal("취소 완료", "신청이 취소되었습니다.", "SUCCESS");
        }, 100);
      } catch (error: any) {
        showModal("오류", error.message || "취소에 실패했습니다.", "ERROR");
      } finally {
        setIsLoading(false);
      }
    } else {
      closeModal();
    }
  };

  return {
    lecture,
    myAppliedId: myEnrolledId,
    isLoading,
    modalState,
    handleApply: handleEnroll,
    handleCancel: handleDrop,
    closeModal,
    confirmAction,
    goBack: router.back,
  };
}
