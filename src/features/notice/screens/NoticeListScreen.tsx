import { Header } from '@shared/components/header/Header';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NoticeDetailModal } from '../components/NoticeDetailModal';
import { getNoticeAuthorLabel } from './getNoticeAuthorLabel';
import { styles } from './styles';
import { useNoticeListViewModel } from './useNoticeListViewModel';

export default function NoticeListScreen() {
	const {
		isLoading,
		error,

		activeTab,
		setActiveTab,

		notices,
		formatDateDot,

		isDetailOpen,
		selected,

		openDetail,
		closeDetail,
	} = useNoticeListViewModel();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Color.default.background }}>
			<Header title="공지사항" onBack={() => router.back()} />

			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: Layout.spacing.l,
					paddingBottom: 40,
				}}
				showsVerticalScrollIndicator={false}
			>
				{/* Tabs */}
				<View style={styles.segmentWrap}>
					<Pressable
						onPress={() => setActiveTab('ALL')}
						style={[styles.segmentBtn, activeTab === 'ALL' && styles.segmentBtnActive]}
					>
						<ThemedText
							variant="text1"
							style={[styles.segmentText, activeTab === 'ALL' && styles.segmentTextActive]}
						>
							전체
						</ThemedText>
					</Pressable>

					<Pressable
						onPress={() => setActiveTab('GENERAL_AFFAIRS')}
						style={[styles.segmentBtn, activeTab === 'GENERAL_AFFAIRS' && styles.segmentBtnActive]}
					>
						<ThemedText
							variant="text1"
							style={[
								styles.segmentText,
								activeTab === 'GENERAL_AFFAIRS' && styles.segmentTextActive,
							]}
						>
							총무팀
						</ThemedText>
					</Pressable>

					<Pressable
						onPress={() => setActiveTab('DEVELOPMENT')}
						style={[styles.segmentBtn, activeTab === 'DEVELOPMENT' && styles.segmentBtnActive]}
					>
						<ThemedText
							variant="text1"
							style={[styles.segmentText, activeTab === 'DEVELOPMENT' && styles.segmentTextActive]}
						>
							개발팀
						</ThemedText>
					</Pressable>
				</View>


				{/* List */}
				<View style={styles.listWrap}>
					{notices.length === 0 ? (
						<View style={styles.emptyCard}>
							<ThemedText variant="text2" style={styles.emptyText}>
								공지사항이 없습니다.
							</ThemedText>
						</View>
					) : (
						notices.map((n) => {
							const dateText = formatDateDot(n.createdAt);

							return (
								<Pressable
									key={n.id}
									style={styles.noticeCard}
									onPress={() => openDetail(n.id)}
								>
									<View style={styles.noticeLeft}>
										<ThemedText variant="text3" style={styles.noticeAuthor}>
											{getNoticeAuthorLabel(n.author)}
										</ThemedText>

										<ThemedText variant="text1" style={styles.noticeTitle} numberOfLines={1}>
											{n.title}
										</ThemedText>

										<ThemedText variant="text5" style={styles.noticeDate}>
											{dateText}
										</ThemedText>
									</View>

									<ThemedText variant="heading3" style={styles.chevron}>
										›
									</ThemedText>
								</Pressable>
							);
						})
					)}
				</View>
			</ScrollView>

			<NoticeDetailModal
				visible={isDetailOpen}
				notice={selected}
				dateText={formatDateDot(selected?.createdAt)}
				onClose={closeDetail}
			/>
		</SafeAreaView>
	);
}
