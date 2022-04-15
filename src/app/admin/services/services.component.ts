import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Ser } from "app/model/ser.model.";
import { SerService } from "app/services/ser.service";
import Swal from "sweetalert2";

declare var $: any;
@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.css"],
})
export class ServicesComponent implements OnInit {
  focus;
  focus1;
  focus2;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  selectedser: Ser = {
    _id: "",
    title: "",
    body: "",
    icon: "",
    createdBy: "",
    createdAt: "",
  };
  constructor(public serService: SerService, private modalService: NgbModal) {}

  ngOnInit() {
    this.refreshpostList();
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.serService.postser(form.value).subscribe(
        (res) => {
          // this.showSucessMessage = true;
          this.refreshpostList();
          this.showNotification("Service est ajouté avec succès");
          this.resetForm(form);
          this.modalService.dismissAll();
          // this.showNotification("user is added suucceffuly");
          // setTimeout(() => (this.showSucessMessage = false), 4000);
          // this.resetForm(form);
          // this.modalService.dismissAll();
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
      this.serService.putser(form.value).subscribe(
        (res) => {
          this.showSucessMessage = true;
          this.refreshpostList();

          this.showNotification("Mise a jour de service se fait avec succès");

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

  open(content) {
    this.modalService.open(content);
  }

  refreshpostList() {
    this.serService.getser().subscribe((res) => {
      this.serService.serr = res as Ser[];
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

  resetForm(form: NgForm) {
    this.selectedser = {
      _id: "",

      title: "",
      body: "",
      icon: "",
      createdBy: "",
      createdAt: "",
    };
    // form.resetForm();
    this.serverErrorMessages = "";
  }

  onDeleteshowSwal(_id: string) {
    Swal.fire({
      title: "Vous êtes sur de supprimer ce service?",
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
        this.serService.deleteser(_id).subscribe((res) => {
          this.refreshpostList();
        });

        Swal.fire({
          title: "Supprimer!",
          text: "Service est supprimé avec succès.",
          type: "success",
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false,
        });
      } else {
        Swal.fire({
          title: "Annuler",
          text: "La suppression est annulé :)",
          type: "error",
          confirmButtonClass: "btn btn-info",
          buttonsStyling: false,
        });
      }
    });
  }

  onEdit(temp: Ser) {
    this.selectedser = temp;
  }
}
