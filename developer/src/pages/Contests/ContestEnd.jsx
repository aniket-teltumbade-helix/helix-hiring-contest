import { Box, Typography } from "@material-ui/core";

export default function ContestEnd() {
  return (
    <Box
      sx={{
        margin: "auto",
        maxWidth: "60vw",
        minHeight: "95vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
      }}
    >
        <Typography variant="h2" align="center">You have successfully Submitted test</Typography>
        <Typography variant="h4" align="center">Our Team will inform you soon</Typography>
    </Box>
  );
}
