import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { DataTable } from "@/components/data-table/data-table";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";

export type Transcription = {
  timestamp: string;
  location: string;
  audio_emotions: { name: string; score: number }[];
  face_emotions: { name: string; score: number }[];
  text: string;
};

const transcriptionData: Transcription[] = [
  {
    timestamp: "2021-08-01 12:00:00",
    location: "San Francisco, CA",
    audio_emotions: [
      { name: "happiness", score: 0.9 },
      { name: "sadness", score: 0.1 },
    ],
    face_emotions: [
      { name: "happiness", score: 0.9 },
      { name: "sadness", score: 0.1 },
    ],
    text: "I'm so happy sad to see you!",
  },
];

const columns: ColumnDef<Transcription>[] = [
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Timestamp" />
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Geolocation" />
    ),
  },
  {
    accessorKey: "audio_emotions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Audio Emotions" />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("audio_emotions").map((emotion) => (
          <Badge key={emotion.name} variant={"secondary"} className="mr-1">
            {emotion.name}: {emotion.score.toFixed(2)}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "face_emotions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Audio Emotions" />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("face_emotions").map((emotion) => (
          <Badge key={emotion.name} variant={"secondary"} className="mr-1">
            {emotion.name}: {emotion.score.toFixed(2)}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "text",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transcription" />
    ),
  },
];

type Emotion = {
  label: string;
  value: string;
};

export default function TranscriptionTable() {
  const [tableData, setTableData] =
    useState<Transcription[]>(transcriptionData); // Initialized with an empty array
  const [emotions, setEmotions] = useState<Emotion[]>([]); // Initialized with an empty array

  const fetchAudio = async () => {
    try {
      console.log("fetching audio");
      const response = await fetch("/api/audio");
      const data: Transcription = await response.json();
      console.log(data);

      // transform the data to match the tableData type
      data.timestamp = data.timestamp || new Date().toLocaleString();
      data.location = data.location || "San Francisco, CA";
      data.audio_emotions = data.audio_emotions || [];
      data.face_emotions = data.face_emotions || [];

      // Add the new transcription to tableData
      setTableData((prevData) => [...prevData, data]);

      // Update emotions with unique emotions from all transcriptions
      const allEmotions = new Set(
        tableData.flatMap((transcription) =>
          transcription.audio_emotions.map((emotion) => emotion.name),
        ),
      );
      const emotionArray = Array.from(allEmotions).map((emotion) => ({
        label: emotion,
        value: emotion,
      }));
      setEmotions(emotionArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "P" || e.key === "p") {
        fetchAudio();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [tableData]);

  return (
    <>
      <DataTable
        columns={columns}
        data={tableData}
        filterString="Filter by emotion"
        filterValues={emotions}
      />
    </>
  );
}
