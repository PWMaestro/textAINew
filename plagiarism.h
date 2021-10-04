#pragma once

#include <iostream>
#include <string>
#include <stdio.h>
#include <stdlib.h>

using namespace std;

double getShinglesMatchingsPersentage(const string &text, const string parsedFragment[], const int &wordsCount);
double antiPlagiarism(string text, string fragment);
string getSubstring(const string &originString, const int &startPosition, const int &length);

int getShinglesTotalCount(const int &wordsTotalCount);
int getMaxStringLength(const string &string1, const string &string2);
int getStringLength(const string &originString);
int getWordsCounter(const string wordsArr[]);
int compareStrings(const string &str1, const string &str2);

void replaceUppercaseLetters(string &word, const int &length);
void writeWordInShingle(string shingle[], int &wordPointer, const string &word, const int &length);
void replaceEngLetters(string &word, const int &length);
void replaceLetter(string &word, const int &length, const char oldLetter, const char newLetter);
void shiftQueue(string queue[], const int &queueLength, const string &newElement);
void findWord(string &str, const string &text, int &startPosition, const int &length);
void parseFragment(const string &fragment, string outputArr[]);

bool isMatchesInFragment(const string shingle[], const string textFragment[], const int &shinglesCount, bool isShinglesChecked[]);
bool isEqualShingles(const string shingle[], const string textFragment[], const int &startPosition);
bool isEmptyWord(const string &word);
bool isExclusion(const string &word);
bool isRepeated(const string &word, const string shingle[], const int &currentWordPointer);
bool isNumber(const string &string, const int &length);
bool isSeparator(char symbol);
bool isNumeral(char symbol);
