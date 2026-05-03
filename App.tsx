import { useState } from 'react';
import {
  View, Text, TextInput, ScrollView,
  TouchableOpacity, StyleSheet, SafeAreaView
} from 'react-native';

const KEYWORDS = ['감성카페', '통창뷰', '루프탑', '빈티지', '포토존', '조용한', '작업하기좋은', '가오픈'];

const SAMPLE_CAFES = [
  { id: '1', name: '온유일', location: '성수동', mood: '감성 • 빈티지', new: true },
  { id: '2', name: '카페 노티드', location: '청담', mood: '통창뷰 • 포토존', new: false },
  { id: '3', name: '어니언', location: '안국', mood: '조용한 • 작업', new: false },
];

export default function App() {
  const [location, setLocation] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const toggleKeyword = (kw: string) => {
    setSelected(prev =>
      prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>☕ 카페파인더</Text>

      <TextInput
        style={styles.input}
        placeholder="지역을 입력하세요 (예: 홍대, 성수)"
        value={location}
        onChangeText={setLocation}
        placeholderTextColor="#aaa"
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.keywordRow}>
        {KEYWORDS.map(kw => (
          <TouchableOpacity
            key={kw}
            style={[styles.keyword, selected.includes(kw) && styles.keywordActive]}
            onPress={() => toggleKeyword(kw)}
          >
            <Text style={[styles.keywordText, selected.includes(kw) && styles.keywordTextActive]}>
              {kw}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.searchBtn}>
        <Text style={styles.searchBtnText}>카페 찾기</Text>
      </TouchableOpacity>

      <ScrollView style={styles.list}>
        {SAMPLE_CAFES.map(cafe => (
          <View key={cafe.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cafeName}>{cafe.name}</Text>
              {cafe.new && <View style={styles.newBadge}><Text style={styles.newBadgeText}>신상</Text></View>}
            </View>
            <Text style={styles.cafeLocation}>📍 {cafe.location}</Text>
            <Text style={styles.cafeMood}>✨ {cafe.mood}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 12 },
  keywordRow: { marginBottom: 12 },
  keyword: { borderWidth: 1, borderColor: '#ddd', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, marginRight: 8, backgroundColor: '#fff' },
  keywordActive: { backgroundColor: '#000', borderColor: '#000' },
  keywordText: { fontSize: 13, color: '#555' },
  keywordTextActive: { color: '#fff' },
  searchBtn: { backgroundColor: '#000', borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 20 },
  searchBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  list: { flex: 1 },
  card: { borderWidth: 1, borderColor: '#eee', borderRadius: 16, padding: 16, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  cafeName: { fontSize: 16, fontWeight: '600', flex: 1 },
  newBadge: { backgroundColor: '#ff6b6b', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  newBadgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  cafeLocation: { fontSize: 13, color: '#888', marginBottom: 4 },
  cafeMood: { fontSize: 13, color: '#555' },
});