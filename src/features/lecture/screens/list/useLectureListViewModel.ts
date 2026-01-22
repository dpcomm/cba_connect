import { DropLectureUseCase } from "@application/lecture/DropLectureUseCase";
import { GetLecturesUseCase } from "@application/lecture/GetLecturesUseCase";
import { GetMyEnrolledLectureIdUseCase } from "@application/lecture/GetMyEnrolledLectureIdUseCase";
import { GetTermUseCase } from "@application/term/GetTermUseCase";
import { Lecture } from "@domain/lecture/Lecture";
import { Term } from "@domain/term/Term";
import { container } from "@shared/di/container";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";

// TODO: 실제 Term 관리가 필요하면 동적으로 가져오도록 수정
const CURRENT_TERM_ID = 4;

export function useLectureListViewModel() {
  const router = useRouter();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [term, setTerm] = useState<Term | null>(null);
  const [myEnrolledId, setMyEnrolledId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const dropLectureUseCase = container.resolve(DropLectureUseCase);

  const load = useCallback(async () => {
    const getLecturesUseCase = container.resolve(GetLecturesUseCase);
    const getTermUseCase = container.resolve(GetTermUseCase);
    const getMyEnrolledUseCase = container.resolve(
      GetMyEnrolledLectureIdUseCase,
    );

    setIsLoading(true);
    try {
      const [fetchedTerm, fetchedLectures, enrolledId] = await Promise.all([
        getTermUseCase.execute(CURRENT_TERM_ID),
        getLecturesUseCase.execute(CURRENT_TERM_ID),
        getMyEnrolledUseCase.execute(),
      ]);
      setTerm(fetchedTerm);
      setLectures(fetchedLectures);
      setMyEnrolledId(enrolledId);
    } catch (error) {
      console.error("Failed to load lectures:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 내가 신청한 강의를 최상단에 분리하여 노출
  const sortedLectures = [...lectures].sort((a, b) => {
    if (myEnrolledId === a.id) return -1;
    if (myEnrolledId === b.id) return 1;
    return 0;
  });

  // 포커스 시 데이터 로드 (화면 pop 혹은 back swipe)
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const refresh = () => {
    load();
  };

  const navigateToDetail = (id: number) => {
    // 이미 신청한 강의가 있고, 클릭한 강의가 그 강의가 아닐 경우 이동하지 않음
    if (myEnrolledId !== null && myEnrolledId !== id) return;

    router.push(`/lecture/${id}` as any);
  };

  const goBack = () => router.back();

  const requestCancel = (id: number) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  const confirmCancel = async () => {
    if (!selectedId) return;
    setIsLoading(true);
    try {
      await dropLectureUseCase.execute(selectedId);
      setModalVisible(false);
      setSelectedId(null);
      load(); // 리프래시
    } catch (error) {
      console.error("Cancel failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeCancelModal = () => {
    setModalVisible(false);
    setSelectedId(null);
  };

  return {
    term,
    lectures: sortedLectures,
    myAppliedId: myEnrolledId,
    isLoading,
    refresh,
    navigateToDetail,
    goBack,
    cancelModal: {
      visible: modalVisible,
      confirm: confirmCancel,
      close: closeCancelModal,
    },
    requestCancel,
  };
}
