import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notificationMessages as notify } from '../utils/messages';


class Loading extends Component {
    state = {
        dots: ['hidden', 'hidden', 'hidden'],
        allVisible: false,
        message: '',
        alternativeStyle: ''
    }
    componentWillMount() {
        if (this.props.message) {
            this.setState((prevState) => {
                return {
                    message: this.props.message,
                    alternativeStyle: ' alternative'
                }
            });
        }
    }
    componentDidMount() {
        let i = 0;
        this.interval = setInterval(function () {
            let newDots = this.state.dots;

            if (!this.state.allVisible) {
                newDots[i] = 'visible';
            } else newDots[i] = 'hidden';

            if (i === 2) {
                this.setState((prevState) => {
                    return {
                        dots: newDots,
                        allVisible: !this.state.allVisible
                    }
                });
                i = -2;
            } else {
                this.setState((prevState) => {
                    return {
                        dots: newDots
                    }
                });
                i++;
            }
        }.bind(this), 150);

        if (this.props.message) {
            this.timeout = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        message: notify.loadingFailing
                    }
                });
            }, 5000);
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
        clearTimeout(this.timeout);
    }
    render() {
        return (
            <div className="loading-container">
                <div className={`loading${this.state.alternativeStyle}`}>
                    <span className={`loading-dot dot-1${this.state.dots[0] === 'hidden' ? ' hidden' : ' visible'}`} />
                    <span className={`loading-dot dot-2${this.state.dots[1] === 'hidden' ? ' hidden' : ' visible'}`} />
                    <span className={`loading-dot dot-3${this.state.dots[2] === 'hidden' ? ' hidden' : ' visible'}`} />
                </div>
                {this.props.message && <span className="title">{this.state.message}</span>}
            </div>
        );
    }
}


Loading.propTypes = {
    message: PropTypes.string
}

export default Loading;
