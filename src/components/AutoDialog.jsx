import * as React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/joy";
import Dialog from "./Dialog";

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
			<Dialog title={title} open={open} setOpen={setOpen}>
				{children}
			</Dialog>
		</React.Fragment>
	);
}

AutoDialog.propTypes = {
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	title: PropTypes.string,
	variant: PropTypes.string,
	children: PropTypes.node,
};
