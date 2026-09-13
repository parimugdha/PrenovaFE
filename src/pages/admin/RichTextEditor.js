import { useEffect, useRef } from "react";

export default function RichTextEditor({
    value,
    onChange,
    placeholder = "Enter content..."
}) {

    const editorRef = useRef(null);

    useEffect(() => {

        if (!editorRef.current) return;

        if (
            editorRef.current.innerHTML !==
            value
        ) {

            editorRef.current.innerHTML =
                value || "";

        }

    }, [value]);


    const executeCommand = (
        command,
        commandValue = null
    ) => {

        editorRef.current?.focus();

        document.execCommand(
            command,
            false,
            commandValue
        );

        onChange(
            editorRef.current.innerHTML
        );

    };


    const handleInput = (e) => {

        onChange(
            e.currentTarget.innerHTML
        );

    };


    return (

        <div className="rich-text-editor">

            {/* ==========================================
                TOOLBAR
            ========================================== */}

            <div className="rich-text-toolbar">

                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        executeCommand("bold")
                    }
                    title="Bold"
                >
                    <strong>B</strong>
                </button>


                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        executeCommand("italic")
                    }
                    title="Italic"
                >
                    <em>I</em>
                </button>


                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        executeCommand("underline")
                    }
                    title="Underline"
                >
                    <u>U</u>
                </button>


                <span className="toolbar-divider" />


                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        executeCommand(
                            "insertUnorderedList"
                        )
                    }
                    title="Bullet list"
                >
                    • List
                </button>


                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        executeCommand(
                            "insertOrderedList"
                        )
                    }
                    title="Numbered list"
                >
                    1. List
                </button>


                <span className="toolbar-divider" />


                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        executeCommand(
                            "formatBlock",
                            "h3"
                        )
                    }
                    title="Heading"
                >
                    H
                </button>


                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        executeCommand(
                            "formatBlock",
                            "p"
                        )
                    }
                    title="Normal text"
                >
                    ¶
                </button>


                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        executeCommand(
                            "removeFormat"
                        )
                    }
                    title="Clear formatting"
                >
                    Tx
                </button>

            </div>


            {/* ==========================================
                EDITOR
            ========================================== */}

            <div
                ref={editorRef}
                className="rich-text-content"
                contentEditable
                suppressContentEditableWarning
                data-placeholder={placeholder}
                onInput={handleInput}
            />

        </div>

    );

}