import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { DataTable } from "@/components/data-table/data-table";
import { useEffect, useState } from "react";

export type Transcription = {
  timestamp: string;
  location: string;
  emotion: string;
  text: string;
};

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
    accessorKey: "emotion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emotion" />
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
  const [tableData, setTableData] = useState<Transcription[]>([]); // Initialized with an empty array
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
      data.emotion = data.emotion || "N/A";
      data.text = data.text || data.transcript

      // Add the new transcription to tableData
      setTableData((prevData) => [...prevData, data]);

      // Update emotions with unique emotions from all transcriptions
      const allEmotions = new Set(
        tableData.map((transcription) => transcription.emotion),
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
