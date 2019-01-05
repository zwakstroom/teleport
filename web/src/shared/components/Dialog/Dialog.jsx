import React from 'react';
import Modal from './../Modal';
import Box from './../Box';
import styled from 'styled-components';

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */
class Dialog extends React.Component {

  handleBackdropClick = event => {

    if (event.target !== event.currentTarget) {
      return;
    }

    if (this.props.onBackdropClick) {
      this.props.onBackdropClick(event);
    }

    if (!this.props.disableBackdropClick && this.props.onClose) {
      this.props.onClose(event, 'backdropClick');
    }
  };

  render() {
    const {
      children,
      disableBackdropClick,
      disableEscapeKeyDown,
      onBackdropClick,
      onClose,
      onEscapeKeyDown,
      open,
      ...other
    } = this.props;

    return (
      <Modal
        disableBackdropClick={disableBackdropClick}
        disableEscapeKeyDown={disableEscapeKeyDown}
        onBackdropClick={onBackdropClick}
        onEscapeKeyDown={onEscapeKeyDown}
        onClose={onClose}
        open={open}
        role="dialog"
        {...other}
      >
        <StyledDialog>
          <StyledDialogContent>
            <Box m={2}>
              {children}
            </Box>
          </StyledDialogContent>
        </StyledDialog>
      </Modal>
    );
  }
}

Dialog.defaultProps = {
  disableBackdropClick: false,
  disableEscapeKeyDown: false,
  fullScreen: false,
  fullWidth: false,
  maxWidth: 'sm',
  scroll: 'paper',
};


const StyledDialog = styled.div`
  height: 100%;
  outline: none;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  will-change: opacity;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`

const StyledDialogContent = styled.div`
  background: ${props => props.theme.colors.bgLight };
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, .24);
  display: flex;
  flex-direction: column;
  margin: 48;
  position: relative;
  overflow-y: auto;
  max-width: 300px;
  max-height: calc(100% - 96px);
`

export default Dialog;