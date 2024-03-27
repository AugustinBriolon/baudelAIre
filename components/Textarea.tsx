'use client'

import React, { useState, useEffect } from 'react';
import poemsList from '../app/utils/poemsList';
import { log } from 'console';

export function Textarea(): JSX.Element {
  const poems = poemsList;
  const [currentPoemIndex, setCurrentPoemIndex] = useState<number>(0);
  const [poemText, setPoemText] = useState<string>('');
  const typingSpeed = 5; // Adjust typing speed as needed
  const [rowsNumber, setRowsNumber] = useState<number>(0);

  // setRowsNumber set on the nomber of lines of the poem
  useEffect(() => {
    const poem = poems[currentPoemIndex];
    const lines = poem.content.split('\n').length;
    setRowsNumber(lines + 5);
  }, [currentPoemIndex, poems]);

  useEffect(() => {
    let currentIndex = 0;
    let text = '';

    const typeWriter = () => {
      const poem = poems[currentPoemIndex];

      text = poem.title + '\n\n' + poem.content + '\n\n' + poem.author;

      setPoemText(text.slice(0, currentIndex));

      currentIndex++;

      if (currentIndex <= text.length) {
        setTimeout(typeWriter, typingSpeed);
      } else {
        setTimeout(() => {
          setCurrentPoemIndex((prevIndex) => (prevIndex + 1) % poems.length);
          setPoemText('');
        }, 2000); // Wait 2 seconds before displaying the next poem
      }
    };

    typeWriter();
  }, [currentPoemIndex, poems]);

  return (
    <div className="relative mx-auto mt-6 aspect-square w-full max-w-xl">
      <textarea
        rows={rowsNumber}
        className="w-full h-fit min-h-96 p-4 resize-none rounded-2xl border border-gray-200 bg-white"
        disabled
        placeholder="Saisissez votre texte ici..."
        value={poemText}
      ></textarea>
    </div>
  );
}
