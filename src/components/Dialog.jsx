import PropTypes from "prop-types";
import { Modal, ModalClose, ModalDialog, DialogTitle, DialogContent } from "@mui/joy";

export default function Dialog({ title = "title", size = "sm", open, setOpen, children }) {
	const handleClose = (_, reason) => {
		if (reason !== "backdropClick") {
			setOpen(false);
		}
	};
	return (
		<Modal open={open} onClose={handleClose}>
			<ModalDialog size={size}>
				<ModalClose />
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>{children}</DialogContent>
			</ModalDialog>
		</Modal>
	);
}

Dialog.propTypes = {
	title: PropTypes.string,
	size: PropTypes.string,
	open: PropTypes.bool,
	setOpen: PropTypes.func,
	children: PropTypes.node,
};
