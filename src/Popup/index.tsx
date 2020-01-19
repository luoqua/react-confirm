import * as React from 'react';
import './index.scss'
interface Props {
  title?: string;
  footer?: React.ReactNode;
  dispatch: {
    (action: string | number): void
  };
  status: 'mount' | 'unmount';
  onClosePopup: { (): void }
}

interface State {
  maskClassName: string;
  mainClassName: string;
}

class Popup extends React.Component<Props, State> {
  state = {
    maskClassName: '',
    mainClassName: ''
  };

  componentDidMount() {
    if (this.props.status === 'mount') {
      this.setState({
        maskClassName: 'fadeIn',
        mainClassName: 'zoomIn'
      })
    } else {
      this.setState({
        maskClassName: 'fadeOut',
        mainClassName: 'zoomOut'
      })
    }
  }

  animationEnd = () => {
    this.setState({
      maskClassName: '',
      mainClassName: ''
    });
    const { status, onClosePopup } = this.props;
    if (status === 'unmount') {
      onClosePopup();
    }
  };

  render() {
    const {
      maskClassName,
      mainClassName
    } = this.state;
    const {
      title,
      footer,
      dispatch
    } = this.props;

    return (
      <div className={`alert-confirm-mask ${maskClassName}`}>
        <div className={`alert-confirm-main ${mainClassName}`} onAnimationEnd={this.animationEnd}>
          <div className="alert-confirm-header">{title}</div>
          {
            <div className="alert-confirm-header-close">
                <span className="icon" onClick={() => dispatch('close')}>✕</span>
            </div>
          }
          <div className="alert-confirm-footer">
            {footer}
          </div>
        </div>
      </div>
    )
  }
}

export default Popup;
