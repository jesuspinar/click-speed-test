import * as React from "react";

import { Button, Modal, ModalClose, ModalDialog, DialogTitle, DialogContent } from "@mui/joy";

export default function AutoDialog({
	disabled,
	placeholder = "placeholder",
	title = "title",
	variant = "outlined",
	children,
}) {
	const [open, setOpen] = React.useState(false);
	return (
		<React.Fragment>
			<Button disabled={disabled} variant={variant} color="neutral" onClick={() => setOpen(true)}>
				{placeholder}
			</Button>
			<Modal open={open} onClose={() => setOpen(false)}>
				<ModalDialog>
					<ModalClose />
					<DialogTitle>{title}</DialogTitle>
					<DialogContent>{children}</DialogContent>
				</ModalDialog>
			</Modal>
		</React.Fragment>
	);
}
