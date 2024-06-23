import * as React from "react";
import { Button, Modal, ModalClose, ModalDialog, DialogTitle, DialogContent } from "@mui/joy";

export default function Dialog({ title = "title", open, setOpen, children }) {
	return (
		<Modal open={open} onClose={() => setOpen(false)}>
			<ModalDialog>
				<ModalClose />
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>{children}</DialogContent>
			</ModalDialog>
		</Modal>
	);
}
