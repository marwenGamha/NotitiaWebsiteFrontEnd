import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Client } from "app/model/client.model";
import { ClientService } from "app/services/client.service";
import Swal from "sweetalert2";

declare var $: any;

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.css"],
})
export class ClientComponent implements OnInit {
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  clients: Client[];

  form: FormGroup;
  imagePath: String;
  imgPreview: String;
  fileToUpload: File = null;
  submitted = false;

  showSucessMessage: boolean;
  serverErrorMessages: string;

  selectedClient: Client = {
    _id: "",

    fullName: "",
    title: "",
    body: "",
    image: "",
    createdAt: "",
  };

  constructor(
    private modalService: NgbModal,
    public clientService: ClientService,
    private fb: FormBuilder
  ) {}

  get clientFormControl() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      _id: new FormControl(null),
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      fullName: new FormControl(null, {
        validators: [Validators.required],
      }),
      body: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.refreshClientList();
  }

  open(content) {
    this.modalService.open(content);
  }

  resetForm() {
    this.form.reset();
    this.submitted = false;
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.imagePath = event.target.result;
      this.imgPreview = reader.result as string;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      if (this.form.value._id == null) {
        this.clientService
          .postClient(
            this.form.value.fullName,
            this.form.value.title,
            this.form.value.body,
            this.fileToUpload
          )

          .subscribe(
            (res) => {
              this.refreshClientList();
              this.showNotification("Client ajouté avec succès");

              // // setTimeout(() => (this.showSucessMessage = false), 4000);
              this.resetForm();
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
        // this.fileToUpload
      } else {
        this.clientService
          .putClient(
            this.form.value._id,
            this.form.value.fullName,
            this.form.value.title,
            this.form.value.body,
            this.fileToUpload
          )

          .subscribe(
            (res) => {
              this.refreshClientList();
              this.showNotification(
                "Mise a jour de client se fait avec succès"
              );

              // // setTimeout(() => (this.showSucessMessage = false), 4000);

              this.resetForm();
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
  }

  onEdit(temp: Client) {
    this.selectedClient = temp;
    this.form.setValue({
      _id: this.selectedClient._id,
      fullName: this.selectedClient.fullName,
      title: this.selectedClient.title,
      body: this.selectedClient.body,
      image: null,
    });
  }

  refreshClientList() {
    this.clientService.getClient().subscribe((res) => {
      this.clients = res as Client[];
    });
  }

  onDeleteshowSwal(_id: string) {
    Swal.fire({
      title: "Vous êtes sur de supprimer ce client?",
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
        this.clientService.deleteClient(_id).subscribe((res) => {
          this.refreshClientList();
        });

        Swal.fire({
          title: "Supprimer!",
          text: "Client est supprimé avec succès.",
          type: "success",
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false,
        });
      } else {
        Swal.fire({
          title: "Annuler§",
          text: "La suppression est annulé :)",
          type: "error",
          confirmButtonClass: "btn btn-info",
          buttonsStyling: false,
        });
      }
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
}
