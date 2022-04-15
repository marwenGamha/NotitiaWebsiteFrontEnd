import { RoleService } from "./../../services/role.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Role } from "app/model/role.model";

declare var $: any;

@Component({
  selector: "app-role",
  templateUrl: "./role.component.html",
  styleUrls: ["./role.component.css"],
})
export class RoleComponent implements OnInit {
  sidebar: any;
  focus;

  form: FormGroup;

  selectedRole: Role = {
    dashboard: "",
    user: "",
    valeur: "",
    team: "",
    contact: "",
    client: "",
    services: "",
  };

  constructor(public roleService: RoleService) {
    this.sidebar = [
      { title: "dashboard" },
      { title: "valeur" },
      { title: "services" },
      { title: "team" },
      { title: "client" },
      { title: "contact" },
      { title: "user" },
    ];
  }

  ngOnInit(): void {
    this.refreshRoleList();
    this.form = new FormGroup({
      dashboard: new FormControl(null, {
        validators: [Validators.required],
      }),
      user: new FormControl(null, {
        validators: [Validators.required],
      }),
      valeur: new FormControl(null, {
        validators: [Validators.required],
      }),
      team: new FormControl(null, {
        validators: [Validators.required],
      }),
      contact: new FormControl(null, {
        validators: [Validators.required],
      }),
      client: new FormControl(null, {
        validators: [Validators.required],
      }),
      services: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  refreshRoleList() {
    this.roleService.getrole().subscribe((res) => {
      this.roleService.role = res as Role;

      this.form.setValue({
        dashboard: this.roleService.role.dashboard,
        user: this.roleService.role.user,
        valeur: this.roleService.role.valeur,
        team: this.roleService.role.team,
        contact: this.roleService.role.contact,
        client: this.roleService.role.client,
        services: this.roleService.role.services,
      });
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.roleService
        .putRole(
          this.form.value.dashboard,
          this.form.value.user,
          this.form.value.valeur,
          this.form.value.team,
          this.form.value.contact,
          this.form.value.client,
          this.form.value.services
        )

        .subscribe(
          (res) => {
            this.refreshRoleList();
            this.showNotification("Visibilité est mise à jour avec succès");
          },
          (err) => {
            console.log("there is an error");
            // if (err.status === 422) {
            //   this.serverErrorMessages = err.error.join("<br/>");
            // } else
            //   this.serverErrorMessages =
            //     "Something went wrong.Please contact admin.";
          }
        );
    }
    // console.log(this.role?.dashboard === "false");
  }

  showNotification(message) {
    var type = ["", "info", "success", "warning", "danger"];

    var color = Math.floor(Math.random() * 4 + 1);

    $.notify(
      {
        icon: "ti-gift",
        message: message,
      },
      {
        type: "success",
        timer: 800,
        placement: {
          from: "top",
          align: "right",
        },
        template:
          '<div data-notify="container" class="col-11 col-md-4 alert alert-{0} alert-with-icon" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="nc-icon nc-simple-remove"></i></button><span data-notify="icon" ></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>',
      }
    );
  }
}
