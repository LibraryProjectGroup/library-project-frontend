import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";

type Props = {
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClick: () => void;
  passwordVisible: boolean;
};

export default function PasswordVisibilityToggle(props: Props) {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={props.onClick}
        onMouseDown={props.onMouseDown}
        edge="end"
      >
        {props.passwordVisible ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
}
