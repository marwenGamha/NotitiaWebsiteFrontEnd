import { ContactService } from "./../../services/contact.service";
import { Component, OnInit } from "@angular/core";
import { Contact } from "app/model/contact.model";
import Swal from "sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

declare var $: any;

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  public contacts: Array<Contact> = [];

  selectedContact: Contact = {
    fullName: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  };

  constructor(
    public contactService: ContactService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.refreshpostList();
  }

  open(content) {
    this.modalService.open(content);
  }

  onEdit(temp: Contact) {
    this.selectedContact = temp;
  }

  refreshpostList() {
    this.contactService.getcontact().subscribe((res) => {
      this.contacts = res as Contact[];
    });
  }

  onDeleteshowSwal(_id: string) {
    Swal.fire({
      title: "Vous êtes sur de supprimer ce message?",
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
        this.contactService.deleteContact(_id).subscribe((res) => {
          this.refreshpostList();
        });

        Swal.fire({
          title: "Supprimer!",
          text: "Message est supprimé avec succès.",
          type: "success",
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false,
        });
      } else {
        Swal.fire({
          title: "Annuler",
          text: "La suppression est annulé :) ",
          type: "error",
          confirmButtonClass: "btn btn-info",
          buttonsStyling: false,
        });
      }
    });
  }
}
