
import textract
import tempfile
import os


def read_file_textact(file) -> str:
    if file:
        extension = file.name.split(".")[-1].lower()
        if extension in ["pdf", "docx", "txt"]:
            # Save the file to a temporary location
            with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                temp_filepath = temp_file.name
                temp_file.write(file.read())

            try:
                # Use textract to extract text from the saved file
                text = textract.process(temp_filepath, extension=extension)
                return text.decode('utf-8', errors='ignore')
            finally:
                # Remove the temporary file
                os.remove(temp_filepath)
        else:
            raise Exception("Unsupported file type")

    raise Exception("No file provided")

