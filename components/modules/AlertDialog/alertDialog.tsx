import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ReactNode } from "react";

export function Alert({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="w-screen h-screen fixed bg-black" />

        <AlertDialog.Content className="w-screen h-screen fixed bg-white rounded-lg">
          <AlertDialog.Title>Delete question</AlertDialog.Title>

          <AlertDialog.Description>
            Are you sure you want to delete this question?
          </AlertDialog.Description>

          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>

          <AlertDialog.Action>Delete</AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
