import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        padding: 16,
        marginTop: 3,
        width: '90%',
        margin: 'auto',
    },
    button: {
        pointerEvents: 'none',
        boxShadow: 'none',
    },
    questionMeta: {
        marginLeft: 10,
        display: 'inline',
    },
    footer: {
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'space-between',
    },

};
class SingleQuiz extends Component {

    state = {
        current: 0,
        selectedValue: '',
        revealed: false,
    };

    componentDidMount() {
        this.setState({ question: this.props.data })
    }

    componentDidUpdate(prevProps, prevstate) {
        if (prevProps.data._id !== this.props.data._id) {
            this.setState({ question: this.props.data, selectedValue: '' })
        }
    }

    handleChange = (event) => {
        this.setState({ selectedValue: event.target.value });
    };
    handleSubmit = () => {
        let {contest, data}=this.props
        let answer=data.options[parseInt(this.state.selectedValue)].option
        console.log({answer,contest, mcq:data.name});
        this.props.handleSubmit({answer,contest, mcq:data.name})
    }

    render() {
        let { index, length } = this.props
        return this.props.data ? (
            <>
                <Paper className={this.props.classes.root} elevation={4}>
                    <Typography variant="headline" component="h5">
                        {this.props.data.description}
                    </Typography>

                    {this.props.data.options.map((opt, index) => (
                        <div
                            key={index}
                            style={{ marginTop: '5px' }}
                            ref={index.toString()}
                        >
                            <Radio
                                checked={this.state.selectedValue === index.toString()}
                                onChange={this.handleChange}
                                value={index.toString()}
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': index.toString() }}
                                color='primary'
                            // classname={this.props.classes.radio}
                            />
                            {opt.option}
                        </div>
                    ))}
                    <div className={this.props.classes.footer}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </Button>
                        <div>
                            {index !== 0 && <Button
                                variant="contained"
                                color="primary"
                                onClick={this.props.handlePrev}
                            >
                                Previous
                            </Button>}{' '}
                            {index + 1 !== length && <Button
                                variant="contained"
                                color="primary"
                                onClick={this.props.handleNext}
                            >
                                Next
                            </Button>}
                        </div>
                    </div>
                </Paper>
            </>
        ) : <h1>Loading....</h1>
    }
}
SingleQuiz.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(SingleQuiz)