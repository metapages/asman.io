import React, { useEffect, useState } from "react";
import { Header, List, Message, Modal } from "semantic-ui-react";

export type ErrorDisplayType = {
  appendError: (e: any) => void;
  clearErrors: () => void;
  errors: any[];
};

export const ErrorDisplayContext = React.createContext<
  ErrorDisplayType | undefined
>(undefined);

export const ErrorDisplayProvider: React.FC<any> = (props) => {
  const [errors, seterrors] = useState<any[]>([]);
  const [errorBlob, seterrorBlob] = useState<ErrorDisplayType>({
    appendError: (e: any) => {
      seterrors(errors.concat([e]));
    },
    clearErrors: () => {
      seterrors([]);
    },
    errors,
  });

  useEffect(() => {
    seterrorBlob(
      {
        appendError: (e: any) => {
          seterrors(errors.concat([e]));
        },
        clearErrors: () => {
          seterrors([]);
        },
        errors: errors.concat([]),
      }
    )
  }, [errors])

  return (
    <ErrorDisplayContext.Provider value={errorBlob}>
      {props.children}
    </ErrorDisplayContext.Provider>
  );
};

export const useErrorDisplay = () => {
  return React.useContext(ErrorDisplayContext);
};

export const ErrorDisplay: React.FC = () => {
  const errorDisplay = useErrorDisplay();
  if (errorDisplay === undefined || errorDisplay.errors.length === 0) {
    return null;
  }

  return (
    <Modal
      open={errorDisplay.errors.length > 0}
      closeIcon={true}
      onClose={errorDisplay.clearErrors}
    >
      <Header icon="archive" content="Errors:" />

      <Modal.Content>
        <List>
          {errorDisplay.errors.map((e, i) => (
            <Message negative key={i}>
              <Message.Header>Oh no an error</Message.Header>
              <p>{`${e}`}</p>
            </Message>
          ))}
        </List>
      </Modal.Content>
    </Modal>
  );
};
