"use client";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { NotionColumn } from "./Columns";
import AlertModal from "@/components/modals/alert-modal";

interface CellActionProps {
  data: NotionColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Copied",
      description: "The URL has been copied to your clipboard.",
    });
  };

  //Action triggered when the delete button is clicked to delete the store
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/products/${data.id}`);
      router.refresh();
      //Place for toast
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Something went wrong while deleting the product. Please try again.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data?.url)}>
            <Copy className="mr-2 w-4 h-4" />
            Copy URL
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/products/${data.id}`)}>
            <Edit className="mr-2 w-4 h-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
