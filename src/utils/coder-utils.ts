export class Coder {
  public static correlations = {
    "A": "my ",
    "B": "the ",
    "C": "need ",
    "D": "we ",
    "E": "I ",
    "F": "gun ",
    "G": "go ",
    "H": "here ",
    "I": "come ",
    "J": "bring ",
    "K": "take ",
    "L": "try ",
    "M": "money ",
    "N": "yes ",
    "O": "me ",
    "P": "and ",
    "Q": "you ",
    "R": "are ",
    "S": "it ",
    "T": "is ",
    "U": "brudda ",
    "V": "a ",
    "W": "blunt ",
    "X": "more ",
    "Y": "or ",
    "Z": "less ",
    "a": "g",
    "b": "r",
    "c": "z",
    "d": "k",
    "e": "q",
    "f": "d",
    "g": "t",
    "h": "b",
    "i": "v",
    "j": "n",
    "k": "j",
    "l": "a",
    "m": "x",
    "n": "l",
    "o": "h",
    "p": "w",
    "q": "o",
    "r": "c",
    "s": "i",
    "t": "s",
    "u": "e",
    "v": "y",
    "w": "m",
    "x": "f",
    "y": "p",
    "z": "u",
    "$": " ",
    "ß": "! ",
    "œ": "? ",
    "ê": "0",
    "æ": "1",
    "ç": "2",
    "ñ": "3",
    "ö": "4",
    "ä": "5",
    "ô": "6",
    "ë": "7",
    "ø": "8",
    "å": "9"
  }

  public static correlationsV2 = {
    decoder: {
      "a": "g",
      "b": "r",
      "c": "z",
      "d": "k",
      "e": "q",
      "f": "d",
      "g": "t",
      "h": "b",
      "i": "v",
      "j": "n",
      "k": "j",
      "l": "a",
      "m": "x",
      "n": "l",
      "o": "h",
      "p": "w",
      "q": "o",
      "r": "c",
      "s": "i",
      "t": "s",
      "u": "e",
      "v": "y",
      "w": "m",
      "x": "f",
      "y": "p",
      "z": "u",
      "$": " ",
      "A": "! ",
      "B": "? ",
      "C": "0",
      "D": "1",
      "E": "2",
      "F": "3",
      "G": "4",
      "H": "5",
      "I": "6",
      "J": "7",
      "K": "8",
      "L": "9"
    },
    encoder: {
      '0': 'C',
      '1': 'D',
      '2': 'E',
      '3': 'F',
      '4': 'G',
      '5': 'H',
      '6': 'I',
      '7': 'J',
      '8': 'K',
      '9': 'L',
      g: 'a',
      r: 'b',
      z: 'c',
      k: 'd',
      q: 'e',
      d: 'f',
      t: 'g',
      b: 'h',
      v: 'i',
      n: 'j',
      j: 'k',
      a: 'l',
      x: 'm',
      l: 'n',
      h: 'o',
      w: 'p',
      o: 'q',
      c: 'r',
      i: 's',
      s: 't',
      e: 'u',
      y: 'v',
      m: 'w',
      f: 'x',
      p: 'y',
      u: 'z',
      ' ': '$',
      '! ': 'A',
      '? ': 'B'
    }
  }

  public static decode(input: string, index = Coder.correlations) {
    let output = [];
    let chars = Array.from(input)
    for (const c of chars) {
      if (Object.keys(index).includes(c)) {
        output.push(index[c])
      }
    }
    return output.join('');
  }

  public static decodeChunk(input: string, index = Coder.correlationsV2.decoder) {
    let output = [];
    let chars: any = Array.from(input)
    for (const c of chars) {
      if (Object.values(index).includes(c)) {
        output.push(index[c])
      }
    }
    return output.join('');
  }


  public static decodeWithUnparsed(input: string) {
    let parts = input.split('&')
    let output = []
    for (const i of Array(parts.length).keys()) {
      if (i > 0) {
        output.push(parts[i][0] + Coder.decodeChunk(parts[i].slice(1)))
      } else { output.push(Coder.decodeChunk(parts[i])) }
    }
    return output.join('')
  }


  public static decodeBeta(input: string) {
    if (input.includes('&')) { return Coder.decodeWithUnparsed(input) }
    else return Coder.decodeChunk(input)
  }


  public static encode(input: string, index = Coder.correlations) {
    let output = input;
    for (const phrase of Object.values(index)) {
      if (output.includes(phrase)) {
        output = output.replaceAll(phrase, index[phrase])
      }
    }
    return output;
  }
  public static encodeBeta(input: string, index = Coder.correlationsV2.encoder) {
    let output = [];
    let chars: any = Array.from(input)
    for (const c of chars) {
      if (Object.values(index).includes(c)) {
        output.push(index[c])
      } else { output.push("&" + c) }
    }
    return output.join('');
  }


  // Runs a test on the decode function 
  // and outputs the result to the terminal
  public static testDecoder(input: string) {
    if (!(input)) { return }
    console.log(Coder.decode(input))
  }

  // ToDO: encoder and encoder test
  // function testDecoder(input){
  //   if (!(input)){return}
  //   console.log(decode(input))
  // }

  testresult = Coder.testDecoder("Uouny$Oaug$gou$tlniq$lyy")
  // testEncoder("some input here")
}
