import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { DataTable } from "@/components/data-table/data-table";

export type Transcription = {
  timestamp: string;
  name: string;
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
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

const names = [
  { label: "Ethan", value: "ethan" },
  { label: "Jay", value: "jay" },
  { label: "Luca", value: "luca" },
  { label: "Michael", value: "michael" },
  { label: "Naman", value: "naman" },
  { label: "Nick", value: "nick" },
  { label: "Pavan", value: "pavan" },
  { label: "Ravi", value: "ravi" },
  { label: "Rohan", value: "rohan" },
  { label: "Tim", value: "tim" },
];

export default function TranscriptionTable({
  data,
}: {
  data: Transcription[];
}) {
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        filterString="Select name"
        filterValues={names}
      />
    </>
  );
}
