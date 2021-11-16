import React, { Component } from 'react'
import {
    Box,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Button,
    Card,
    CardContent,
    Divider
} from "@material-ui/core";
import Editor from "@monaco-editor/react";
import BasicTable from "../../../components/BasicTable";
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    root: {
        backgroundColor: "red"
    }
});

export class SingleChallenge extends Component {
    state = {
        language: "javascript",
        code: "// let's write some broken code 😈",
        languages: ["javascript", "python", "c", "cpp", "java"]
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            code: "// let's write some broken code 😈"
        });
    };
    handleEditor = (value) => {
        this.setState({ code: value })
    }
    handleRun = () => {
        this.props.handleRun(
            this.state.language,
            this.state.code,
            this.props.data.samples,
            this.props.data.name, true)
    }


    render() {
        console.log(this.props.data);
        return this.props.data?(
            <Box display="flex">
                <Grid container md={6} elevation={3} noGutter>
                    <Grid item xs m={0}>
                        <Box sx={{ height: "80vh", overflowY: "scroll" }}>
                            <div style={{ position: "fixed", background: "white", width: "100%" }}>
                                <Typography variant="h5" component="div">{this.props.data.name}</Typography>
                            </div>
                            <div style={{ marginTop: "50px" }} dangerouslySetInnerHTML={{ __html: this.props.data.description }}></div>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container md={6} sx={{
                    display: "flex",
                    flexDirection: "column",
                    overflowX: "hidden"
                }} noGutter>
                    <Grid item md={12}>
                        <Box sx={{ position: "absolute", right: "10px" }}>
                            <FormControl variant="outlined" size="small">
                                <InputLabel
                                    ref={ref => {
                                        this.InputLabelRef = ref;
                                    }}
                                    htmlFor="outlined-age-simple"
                                >
                                    Language
                                </InputLabel>
                                <Select noGutter
                                    value={this.state.language}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={this.state.labelWidth}
                                            name="language"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    {
                                        this.state.languages.map(el => <MenuItem value={el}>{el}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ marginTop: "50px" }}></Box>
                        <Editor
                            theme="vs-dark"
                            height="50vh"
                            language={this.state.language}
                            value={this.state.code}
                            onChange={this.handleEditor}
                        // onValidate={this.props.handleEditorValidation}
                        ></Editor>
                        <Box sx={{ display: "flex" }}>
                            <Box m={1}>
                                <Button color="primary" variant="contained" size="small"
                                    onClick={this.handleRun}
                                    disabled={this.state.code === "// let's write some broken code 😈"}>Run</Button>
                            </Box>
                            <Box m={1}>
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    disabled={this.state.code === "// let's write some broken code 😈"}
                                    onClick={() => this.props.handleSubmit(this.state)}
                                >Submit</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={12}>
                        {this.props.result && this.props.result.output ? (<Box>
                            <Typography variant="h5" color={this.props.result.failed === 0 ? "primary" : "error"}>{this.props.result.failed === 0 ? "Accepted" : "Wrong Answer"}</Typography>
                            <BasicTable
                                rows={this.props.result.output.map((el, index) => {
                                    return { ...el, id: index }
                                })}
                                columns={[
                                    { field: "input", flex: 1 },
                                    { field: "expected", flex: 1 },
                                    { field: "output", flex: 1 }
                                ]}
                            />
                        </Box>) : (this.props.result &&
                            this.props.result.error ? (<>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" color="error">
                                            Compilation error
                                        </Typography>
                                        <Divider />
                                        <Typography variant="body2" color="error" component="pre" style={{ maxHeight: "15vh", overflowY: "scroll" }}>
                                            {this.props.result.error}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </>) : null)
                        }
                    </Grid>
                </Grid>
            </Box>
        ):<h1>Loading</h1>
    }
}

export default withStyles(styles, { withTheme: true })(SingleChallenge)
