import { ILectureRepository } from "@domain/lecture/ILectureRepository";
import { Lecture } from "@domain/lecture/Lecture";
import { apiClient } from "@shared/api/client";
import { API_PREFIX } from "@shared/api/config";
import { ApiResponse } from "@shared/api/types";
import { useAuthStore } from "@shared/stores/useAuthStore";
import { injectable } from "tsyringe";

interface LectureResponseDto {
  id: number;
  title: string;
  instructorName: string;
  location: string;
  startTime: string;
  currentCount: number;
  maxCapacity: number;
  termName: string;
  codeNumber: string;
  introduction: string;
  instructorBio?: string;
  instructorImage?: string;
}

@injectable()
export class ApiLectureRepository implements ILectureRepository {
  async getLecturesByTerm(termId: number): Promise<Lecture[]> {
    try {
      const response = await apiClient.get<ApiResponse<LectureResponseDto[]>>(
        `${API_PREFIX}/term/${termId}/lectures`,
      );
      return response.data.data.map(this.mapToLecture);
    } catch (error) {
      console.error("Failed to fetch lectures:", error);
      throw error;
    }
  }

  async getLecture(id: number): Promise<Lecture | null> {
    try {
      const response = await apiClient.get<ApiResponse<LectureResponseDto>>(
        `${API_PREFIX}/lecture/${id}`,
      );
      return this.mapToLecture(response.data.data);
    } catch (error) {
      console.error("Failed to fetch lecture:", error);
      return null;
    }
  }

  async enrollLecture(lectureId: number): Promise<void> {
    try {
      const user = useAuthStore.getState().user;
      if (!user) throw new Error("로그인이 필요합니다.");

      await apiClient.post(`${API_PREFIX}/lecture/enroll`, {
        userId: user.id,
        lectureId,
      });
    } catch (error) {
      console.error("Failed to enroll lecture:", error);
      throw error;
    }
  }

  async dropLecture(lectureId: number): Promise<void> {
    try {
      const user = useAuthStore.getState().user;
      if (!user) throw new Error("로그인이 필요합니다.");

      await apiClient.post(`${API_PREFIX}/lecture/drop`, {
        userId: user.id,
        lectureId,
      });
    } catch (error) {
      console.error("Failed to drop lecture:", error);
      throw error;
    }
  }

  async getMyEnrolledLectureId(): Promise<number | null> {
    try {
      const response = await apiClient.get<ApiResponse<LectureResponseDto[]>>(
        `${API_PREFIX}/lecture/me`,
      );
      const lectures = response.data.data;
      // 현재 하나만 신청 가능하므로 첫 번째 강의 ID 반환
      return lectures.length > 0 ? lectures[0].id : null;
    } catch (error) {
      console.error("Failed to fetch my enrolled lecture:", error);
      return null;
    }
  }

  private mapToLecture(dto: LectureResponseDto): Lecture {
    return {
      id: dto.id,
      title: dto.title,
      instructorName: dto.instructorName,
      location: dto.location,
      introduction: dto.introduction,
      startTime: dto.startTime,
      termName: dto.termName,
      codeNumber: dto.codeNumber,
      currentCount: dto.currentCount,
      maxCapacity: dto.maxCapacity,
      instructorBio: dto.instructorBio,
      instructorImage: dto.instructorImage,
    };
  }
}
