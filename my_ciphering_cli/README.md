# Ciphering CLI Tool

## CLI tool that will encode and decode a text by 3 substitution ciphers:
* [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)
* [Atbash cipher](https://en.wikipedia.org/wiki/Atbash)
* [ROT-8 as variation of ROT-13](https://en.wikipedia.org/wiki/ROT13)

CLI tool accepts 3 options (short alias and full name):

1.  **-c, --config**: config for ciphers
Config is a string followed by pattern `{XY(-)}n`, where:
  * `X` is a cipher mark:
    * `C` is for Caesar cipher (with shift 1)
    * `A` is for Atbash cipher
    * `R` is for ROT-8 cipher
  * `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    * `1` is for encoding
    * `0` is for decoding
2.  **-i, --input**: a path to input file
3.  **-o, --output**: a path to output file

For example, config `"C1-C1-R0-A"` means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"

## Details:

1. Application doesn't use any 3rd party libraries
2. `Config` option is required and validated. In case of invalid confing **human-friendly** error is printed in `stderr` and the process should exit with non-zero status code.
3. If any option is duplicated (i.e. `bash $ node my_ciphering_cli -c C1-C1-A-R0 -c C0`) then **human-friendly** error is printed in `stderr` and the process should exit with non-zero status code.
4. If the input file option is missed - `stdin` serves as input source.
5. If the output file option is missed - `stdout` serves as output destination.
6. If the input and/or output file is given but doesn't exist or you can't access it (e.g. because of permissions or it's a directory) - **human-friendly** error is printed in `stderr` and the process should exit with non-zero status code.
7. If passed params are fine the output (file or `stdout`) contains transformed content of input (file or `stdin`).
8. For encoding/decoding **only the English alphabet is used**, all other characters kept untouched.

**Usage example:**  

```bash
$ node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`

```bash
$ node my_ciphering_cli -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`

```bash
$ node my_ciphering_cli -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`

```bash
$ node my_ciphering_cli -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `This is secret. Message about "_" symbol!`
