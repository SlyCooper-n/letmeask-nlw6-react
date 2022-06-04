import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ReactNode } from "react";

const MyAlertDialog = ({ children }: { children: ReactNode | ReactNode[] }) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger>{children}</AlertDialog.Trigger>

    <AlertDialog.Portal>
      <AlertDialog.Overlay />

      <AlertDialog.Content>
        <AlertDialog.Title />

        <AlertDialog.Description />

        <AlertDialog.Cancel />

        <AlertDialog.Action />
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default MyAlertDialog;
