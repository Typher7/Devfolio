import React, { useState, useEffect } from "react";

export default function TextType({
  text = [],
  typingSpeed = 100,
  pauseDuration = 2000,
  showCursor = true,
  cursorCharacter = "|",
  className = "",
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (!text.length) return;

    const currentFullText = text[currentTextIndex];
    const timeout = isDeleting ? typingSpeed / 2 : typingSpeed;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % text.length);
        }
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    currentTextIndex,
    text,
    typingSpeed,
    pauseDuration,
  ]);

  // Cursor blink effect
  useEffect(() => {
    if (!showCursor) return;

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [showCursor]);

  return (
    <span className={className}>
      {currentText}
      {showCursor && (
        <span
          style={{
            opacity: cursorVisible ? 1 : 0,
            transition: "opacity 0.1s",
          }}
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
