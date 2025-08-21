import React, {  useMemo } from "react";
import {Dialog } from "@fluentui/react/lib/Dialog";
import { useId } from "@fluentui/react-hooks";

const dialogStyles = {
  main: {
    background: "white",
    borderRadius: "10px",
    padding: 0,
    margin: 0,
    boxShadow:
      "0px 6.400000095367432px 14.399999618530273px 0px rgba(0, 0, 0, 0.13), 0px 1.2000000476837158px 3.5999999046325684px 0px rgba(0, 0, 0, 0.10)",
  },
};

const DialogModal = ({ isOpen, reset, children, width, parent }) => {
  const labelId = useId("dialogLabel");
  const subTextId = useId("subTextLabel");

  const modalProps = useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
    }),
    [labelId, subTextId]
  );

  return (
    <>
      <Dialog
        styles={dialogStyles}
        minWidth={width}
        isOpen={isOpen}
        onDismiss={reset}
        modalProps={modalProps}
      >
        {parent}
        {children}
      </Dialog>
    </>
  );
};

export default DialogModal;
