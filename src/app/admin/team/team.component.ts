import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Team } from "app/model/team.model";
import { TeamService } from "app/services/team.service";
import Swal from "sweetalert2";
import { mimeType } from "./mime-type.validator.ts";

declare var $: any;

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.css"],
})
export class TeamComponent implements OnInit {
  // public Team [];
  teams: Team[];
  form: FormGroup;
  imagePath: String;
  imgPreview: String;
  fileToUpload: File = null;
  submitted = false;

  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  focus6;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  selectedTeam: Team = {
    _id: "",

    fullName: "",
    title: "",
    imagePath: "",
    createdAt: "",
    facebook: "",
    email: "",
    linkedin: "",
    twitter: "",
  };

  constructor(
    private modalService: NgbModal,
    public teamService: TeamService,
    private fb: FormBuilder
  ) {}

  get teamFormControl() {
    return this.form.controls;
  }

  resetForm() {
    this.form.reset();
    this.submitted = false;
    this.form.markAsPristine();
    this.form.markAsUntouched();
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
      imagePath: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
      facebook: new FormControl(),

      twitter: new FormControl(),

      email: new FormControl(),

      linkedin: new FormControl(),
    });

    this.refreshTeamList();
  }

  // onImagePicked(event: Event) {
  //   // const file = (event.target as HTMLInputElement).files[0];

  //   // this.form.patchValue({ image: file });
  //   // this.form.get("imagePath").updateValueAndValidity();
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     this.imgPreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(this.fileToUpload);
  // }

  open(content) {
    this.modalService.open(content);
  }

  // onfilepreview(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imgPreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.imagePath = event.target.result;
      this.imgPreview = reader.result as string;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  // this.selectedTeam.facebook,
  // this.selectedTeam.linkedin,
  // this.selectedTeam.twitter,
  // this.selectedTeam.email

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      if (this.form.value._id == null) {
        this.teamService
          .postTeam(
            this.form.value.fullName,
            this.form.value.title,
            this.fileToUpload,
            this.form.value.facebook,
            this.form.value.twitter,
            this.form.value.email,
            this.form.value.linkedin
          )

          .subscribe(
            (res) => {
              this.refreshTeamList();
              this.showNotification("Member d'equipe est ajouté avec succès");

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
        this.teamService
          .putTeam(
            this.form.value._id,
            this.form.value.fullName,
            this.form.value.title,
            this.form.value.facebook,
            this.form.value.twitter,
            this.form.value.email,
            this.form.value.linkedin,
            this.fileToUpload
          )

          .subscribe(
            (res) => {
              this.refreshTeamList();
              this.showNotification(
                "Mise a jour de membre d'equipe se fait avec succès"
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

  onEdit(temp: Team) {
    this.selectedTeam = temp;
    this.form.setValue({
      _id: this.selectedTeam._id,
      fullName: this.selectedTeam.fullName,
      title: this.selectedTeam.title,
      facebook: this.selectedTeam.facebook,
      email: this.selectedTeam.email,
      linkedin: this.selectedTeam.linkedin,
      twitter: this.selectedTeam.twitter,
      imagePath: null,
    });
  }

  refreshTeamList() {
    this.teamService.getteams().subscribe((res) => {
      this.teams = res as Team[];
    });
  }

  onDeleteshowSwal(_id: string) {
    Swal.fire({
      title: "Vous êtes sur de supprimer ce membre?",
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
        this.teamService.deleteTeam(_id).subscribe((res) => {
          this.refreshTeamList();
        });

        Swal.fire({
          title: "Supprimer!",
          text: "Member est supprimé avec succès.",
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
