import VerseClientComponent from './VerseClientComponent';

export default async function VerseDetail({
  params,
}: { params: Promise<{ chapterNumber: string; verseNumber: string }> }) {
  const { chapterNumber, verseNumber } = await params;

  return (
    <VerseClientComponent
      chapterNumber={chapterNumber}
      verseNumber={verseNumber}
    />
  );
} 