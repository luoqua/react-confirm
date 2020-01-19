import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fragment } from 'react';
import Popup from '../Popup/index';


interface resloveInterface {
    (instance?: boolean): void;
}
interface dispatchInterface {
    (action: string | number): void;
}

interface asyncInterface {
    (): Promise<boolean>
}

interface getFooterInterface {
    (dispatch: dispatchInterface): React.ReactNode;
}


export interface AlertConfirmInterface {
    title?: string;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    status: 'mount' | 'unmount';
    container: Element;
    resolve?: resloveInterface;
    reject?: resloveInterface;
}

class AlertConfirm implements AlertConfirmInterface {
    title?: string;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    status: 'mount' | 'unmount' = 'mount';
    container: Element = null;
    action: string | number = null;
    resolve?: {(instance?: boolean): void};
    reject?: {(instance?: boolean): void};

    constructor(title: string) {
        const container: HTMLDivElement = document.createElement('div');
        container.className = 'alert-confirm-container';
        document.body.appendChild(container);
        this.container = container;
        this.title = title;
        this.footer = (
            <Fragment>
                <button onClick={() => this.dispatch('cancel')}>取 消</button>
                <button
                    onClick={() => this.dispatch('ok')}
                >确 认</button>
            </Fragment>
        )

        this.render();
    }
    dispatch: dispatchInterface = action => {
        this.action = action;
        const {resolve, reject} = this;

        if (action === 'ok') {
            resolve && resolve(true);
        }
        if (action === 'cancel') {
            resolve && resolve(false);
        }
        this.closePopup();
    }

    closePopup = (): void => {
        this.status = 'unmount';
        this.render();
    }

    async: asyncInterface = () => {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        })
    }

    render() {
        const {
          container,
          title,
          footer,
          status,
          dispatch
        } = this;
        ReactDOM.unmountComponentAtNode(container);
        ReactDOM.render(
          <Popup
            title={title}
            footer={footer}
            dispatch={action => dispatch(action)}
            status={status}
            onClosePopup={() => {
              ReactDOM.unmountComponentAtNode(container);
              document.body.removeChild(container);
            }}
          />,
          container);
      }
    
}

const confirm = (title: string) => {
    return new AlertConfirm(title).async();
}

export default confirm;