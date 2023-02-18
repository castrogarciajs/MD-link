import { existsSync, statSync, readdirSync } from "fs";
import { isAbsolute, resolve, extname } from "path";
import { cwd } from "process";

/**
 *
 * @param pathname | es la ruta
 * @returns validar si existe una path y devuelve un boolean
 */
const pathnameExist = (pathname: string): boolean => {
  const isValid = existsSync(pathname);
  return isValid ? true : false;
};

/**
 *
 * @param pathname es la ruta
 * @returns validar si la ruta es absoluta
 */
const validatorAbsolute = (pathname: string): boolean => {
  const absolute = isAbsolute(pathname);
  return absolute ? true : false;
};

/**
 *
 * @param pathname es la ruta relativa
 * @returns retorna una ruta absoluta
 */
const converToAbsolute = (pathname: string): string => {
  const CWD = cwd();
  return resolve(CWD, pathname);
};

const isAdirectory = (pathname: string) => {
  const state = statSync(pathname);
  return state.isDirectory() ? true : false;
};

const readFolder = (pathname: string) => {
  const files = readdirSync(pathname);
  return files;
};

const isValidMD = (pathname: string) => {
  return extname(pathname) === ".md" ? true : false;
};

const getMdFiles = (pathname: string) => {
  let mdArray: Array<string> = [];

  if (isValidMD(pathname)) {
    mdArray.push(pathname);
  } else if (isAdirectory(pathname)) {
    const content = readFolder(pathname);
    content.map(
      (item) => (mdArray = mdArray.concat(getMdFiles(`${pathname}/${item}`)))
    );
  }
  return mdArray;
};

export {
  pathnameExist,
  validatorAbsolute,
  converToAbsolute,
  isAdirectory,
  readFolder,
  isValidMD,
};
