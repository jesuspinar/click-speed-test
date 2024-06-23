import * as React from "react";

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
