frappe.provide('frappe.ui')

window.web_form = null;

frappe.ui.WebForm = class WebForm extends frappe.ui.FieldGroup {
	constructor(opts) {
		super();
		Object.assign(this, opts)
		window.web_form = this
	}

	make(opts) {
		super.make();
		this.setup_secondary_action();
		this.setup_primary_action();
	}

	setup_primary_action() {
		const primary_action_button = document.createElement('button');
		primary_action_button.classList.add('btn', 'btn-primary', 'primary-action', 'btn-form-submit', 'btn-sm', 'ml-2');
		primary_action_button.innerText = 'Save'
		primary_action_button.onclick = () => this.save();
		document.querySelector('.web-form-actions').appendChild(primary_action_button);
	}

	setup_secondary_action() {
		const secondary_action_button = document.createElement('button');
		secondary_action_button.classList.add('btn', 'btn-danger', 'button-delete', 'btn-sm', 'ml-2');
		secondary_action_button.innerText = 'Delete'
		document.querySelector('.web-form-actions').appendChild(secondary_action_button);
	}

	save() {
		let data = this.get_values();
		if (!data || window.saving) return false;

		window.saving = true;
		frappe.form_dirty = false;
		data.doctype = this.web_form_doctype;

		frappe.call({
			type: "POST",
			method: "frappe.website.doctype.web_form.web_form.accept",
			args: {
				data: data,
				web_form: this.web_form_name,
			},
			callback: function(response) {
				if(!response.exc) {

				}
			},
			always: function() {
				window.saving = false;
			}
		});
		return true;
	}
};
