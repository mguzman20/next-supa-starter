'use client';
import React from 'react';
import { Container } from '@/components/Landing/Container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const Faq = () => {
  return (
    <Container className="!p-0">
      <Accordion type="single" collapsible className="mx-auto max-w-3xl">
        {faqdata.map((faq, index) => (
          <AccordionItem key={index} value={faq.question} className="text-lg">
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent className="text-lg">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};

const faqdata = [
  {
    question: 'Is this template completely free to use?',
    answer: 'Yes, this template is completely free to use.',
  },
  {
    question: 'Can I use it in a commercial project?',
    answer: 'Yes, this you can.',
  },
  {
    question: 'What is your refund policy? ',
    answer:
      "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.",
  },
  {
    question: 'Do you offer technical support? ',
    answer:
      "No, we don't offer technical support for free downloads. Please purchase a support plan to get 6 months of support.",
  },
];
