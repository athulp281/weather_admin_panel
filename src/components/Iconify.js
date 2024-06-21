import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Iconify.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    sx: PropTypes.object,
};

export default function Iconify({
    icon,
    width = 22,
    height = 22,
    style,
    color,
    ...other
}) {
    return (
        <Icon
            icon={icon}
            height={height}
            width={width}
            style={style}
            color={color}
        />
    );
}
