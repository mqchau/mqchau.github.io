import cgi;
import cgitb
cgitb.enable()

def main():
	form = cgi.FieldStorage()
	if (form.has_key("param1") and form.has_key("param2")):
		display_data(form["param1"].value, form["param2"].value)
	else:
		generate_error_form()