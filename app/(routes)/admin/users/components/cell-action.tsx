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
      await axios.delete(`/api/user/${data.id}`);
      router.refresh();
      toast({
        title: "Success",
        description: "User has been deleted",
      });
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

  const onActivate = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/user/activate/${data.id}`);
      router.refresh();
      toast({
        title: "Success",
        description: "User has been activated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Something went wrong while activating user. Please try again.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onDeactivate = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/user/deactivate/${data.id}`);
      router.refresh();
      toast({
        title: "Success",
        description: "User has been deactivated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Something went wrong while deactivating user. Please try again.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const onDeactivateAdmin = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/user/deactivateAdmin/${data.id}`);
      router.refresh();
      toast({
        title: "Success",
        description: "User Admin rights has been deactivated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Something went wrong while deactivating user as a admin. Please try again.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onActivateAdmin = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/user/activateAdmin/${data.id}`);
      router.refresh();
      toast({
        title: "Success",
        description: "User Admin rights has been activated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Something went wrong while activating uses as a admin. Please try again.",
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
          <DropdownMenuItem onClick={() => onCopy(data?.id)}>
            <Copy className="mr-2 w-4 h-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onActivate()}>
            <Edit className="mr-2 w-4 h-4" />
            Activate
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDeactivate()}>
            <Edit className="mr-2 w-4 h-4" />
            Deactivate
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onActivateAdmin()}>
            <Edit className="mr-2 w-4 h-4" />
            Activate Admin rights
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDeactivateAdmin()}>
            <Edit className="mr-2 w-4 h-4" />
            Deactivate Admin rights
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
