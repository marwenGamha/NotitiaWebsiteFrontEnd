import { Component, OnInit } from "@angular/core";
import { UserService } from "app/login/user.service";
import Swal from "sweetalert2";
import { NgForm } from "@angular/forms";
import { User } from "app/login/user.model";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

declare var $: any;

@Component({
  selector: "app-userr",
  templateUrl: "./userr.component.html",
  styleUrls: ["./userr.component.css"],
})
export class UserrComponent implements OnInit {
  private modalRef: NgbModalRef;
  public toggleButton: boolean = false;

  focus;
  focus1;
  focus2;
  focus3;

  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(
    public userService: UserService,
    private modalService: NgbModal
  ) {}

  enable() {
    this.toggleButton = false;
  }

  disable() {
    this.toggleButton = true;
  }

  ngOnInit() {
    this.refreshUserList();
  }

  ngAfterViewInit(form: NgForm) {
    this.refreshUserList();
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.userService.postUser(form.value).subscribe(
        (res) => {
          this.showSucessMessage = true;
          this.refreshUserList();

          this.showNotification("Utilisateur est ajouté avec succès");

          setTimeout(() => (this.showSucessMessage = false), 4000);
          this.resetForm(form);
          this.modalService.dismissAll();
        },
        (err) => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join("<br/>");
          } else
            this.serverErrorMessages =
              "Something went wrong.Please contact admin.";
        }
      );
    } else {
      this.userService.putUser(form.value).subscribe(
        (res) => {
          this.showSucessMessage = true;
          this.refreshUserList();

          this.showNotification(
            "Mise a jour d'utilisateur se fait avec succès"
          );

          setTimeout(() => (this.showSucessMessage = false), 4000);
          this.resetForm(form);
          this.modalService.dismissAll();
        },
        (err) => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join("<br/>");
          } else
            this.serverErrorMessages =
              "Something went wrong.Please contact admin.";
        }
      );
    }
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      _id: "",

      fullName: "",
      email: "",
      password: "",
      creation_dt: "",
      role: "",
    };
    // form.resetForm();
    this.serverErrorMessages = "";
  }

  onDeleteshowSwal(_id: string) {
    Swal.fire({
      title: "Vous êtes sur de supprimer cet utilisateur?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Supprimer!",
      cancelButtonText: "Non, Annuler!",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(_id).subscribe((res) => {
          this.refreshUserList();
        });

        Swal.fire({
          title: "Supprimer!",
          text: "Utilisateur est supprimé avec succès.",
          type: "success",
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false,
        });
      } else {
        Swal.fire({
          title: "Annuler!",
          text: "La suppression est annulé :)",
          type: "error",
          confirmButtonClass: "btn btn-info",
          buttonsStyling: false,
        });
      }
    });
  }

  onsendshowSwal(email: string) {
    Swal.fire({
      title:
        "Vous êtes sur d'envoyer un mail de récupération de mot de passe a ce utilisateur?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, envoyer!",
      cancelButtonText: "Non, Annuler!",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.userService.forgetPass(email).subscribe((res) => {});

        Swal.fire({
          title: "Succès!",
          text: "Email est envoyé avec succès.",
          type: "success",
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false,
        });
      } else {
        Swal.fire({
          title: "Annuler",
          text: " l'envoie de mail est annulé.",
          type: "error",
          confirmButtonClass: "btn btn-info",
          buttonsStyling: false,
        });
      }
    });
  }

  refreshUserList() {
    this.userService.getUsers().subscribe((res) => {
      this.userService.users = res as User[];
    });
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
  open(content) {
    this.modalService.open(content);
  }

  onEdit(temp: User) {
    this.userService.selectedUser = temp;
  }
}
