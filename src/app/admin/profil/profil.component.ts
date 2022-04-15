import { NgForm } from "@angular/forms";
import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "app/login/user.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { RoleService } from "app/services/role.service";

declare var swal: any;
declare var $: any;

interface FileReaderEventTarget extends EventTarget {
  result: string;
}
interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.css"],
})
export class ProfilComponent implements OnInit {
  Value: string;
  userDetails;
  focus;
  focus1;
  focus2;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(
    private userService: UserService,

    private router: Router,
    private modalService: NgbModal
  ) {}

  model = {
    id: "",
    passwordCurrent: "",
    password: "",
  };

  setField() {
    this.Value = this.userDetails.id;
  }

  onSubmit(form: NgForm) {
    this.model.id = this.userDetails._id;
    this.userService.updatePassword(form.value).subscribe(
      (res) => {
        this.showNotification("Votre mot de passe à été changé avec succès");
        setTimeout(() => (this.showSucessMessage = false), 4000);
        this.resetForm(form);
        this.modalService.dismissAll();
        this.refrecgcredenciel();
      },
      (err) => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }

  readURL(input) {
    if (input.files && input.files[0]) {
      var reader: any = new FileReader();
      reader.onload = (e: FileReaderEvent) => {
        $("#wizardPicturePreview").attr("src", e.target.result).fadeIn("slow");
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  onFinishWizard() {
    //here you can do something, sent the form to server via ajax and show a success message with swal
    swal("Good job!", "You clicked the finish button!", "success");
  }

  refrecgcredenciel() {
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res["user"];
        this.model.id = this.userDetails._id;
        localStorage.setItem("role", this.userDetails.role);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.refrecgcredenciel();
    setTimeout(function () {
      $(".card.card-wizard").addClass("active");
    }, 600);
    if ($(".selectpicker").length != 0) {
      $(".selectpicker").selectpicker({
        iconBase: "nc-icon",
        tickIcon: "nc-check-2",
      });
    }
    // Code for the Validator
    const $validator = $(".card-wizard form").validate({
      rules: {
        firstname: {
          required: true,
          minlength: 3,
        },
        lastname: {
          required: true,
          minlength: 3,
        },
        email: {
          required: true,
          minlength: 3,
        },
      },
      highlight: function (element) {
        $(element)
          .closest(".form-group")
          .removeClass("has-success")
          .addClass("has-danger");
      },
      success: function (element) {
        $(element)
          .closest(".form-group")
          .removeClass("has-danger")
          .addClass("has-success");
      },
      errorPlacement: function (error, element) {
        $(element).append(error);
      },
    });
    // Wizard Initialization
    $(".card-wizard").bootstrapWizard({
      tabClass: "nav nav-pills",
      nextSelector: ".btn-next",
      previousSelector: ".btn-previous",
      onNext: function (tab, navigation, index) {
        var $valid = $(".card-wizard form").valid();
        if (!$valid) {
          $validator.focusInvalid();
          return false;
        }
      },
      onInit: function (tab: any, navigation: any, index: any) {
        // check number of tabs and fill the entire row
        let $total = navigation.find("li").length;
        let $wizard = navigation.closest(".card-wizard");
        let $first_li = navigation.find("li:first-child a").html();
        let $moving_div = $('<div class="moving-tab">' + $first_li + "</div>");
        $(".card-wizard .wizard-navigation").append($moving_div);
        $total = $wizard.find(".nav li").length;
        let $li_width = 100 / $total;
        let total_steps = $wizard.find(".nav li").length;
        let move_distance = $wizard.width() / total_steps;
        let index_temp = index;
        let vertical_level = 0;
        let mobile_device = $(document).width() < 600 && $total > 3;
        if (mobile_device) {
          move_distance = $wizard.width() / 2;
          index_temp = index % 2;
          $li_width = 50;
        }
        $wizard.find(".nav li").css("width", $li_width + "%");
        let step_width = move_distance;
        move_distance = move_distance * index_temp;
        let $current = index + 1;
        if ($current == 1 || (mobile_device == true && index % 2 == 0)) {
          move_distance -= 8;
        } else if (
          $current == total_steps ||
          (mobile_device == true && index % 2 == 1)
        ) {
          move_distance += 8;
        }
        if (mobile_device) {
          let x: any = index / 2;
          vertical_level = parseInt(x);
          vertical_level = vertical_level * 38;
        }
        $wizard.find(".moving-tab").css("width", step_width);
        $(".moving-tab").css({
          transform:
            "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
          transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)",
        });
        $(".moving-tab").css("transition", "transform 0s");
      },
      onTabClick: function (tab: any, navigation: any, index: any) {
        const $valid = $(".card-wizard form").valid();
        if (!$valid) {
          return false;
        } else {
          return true;
        }
      },
      onTabShow: function (tab: any, navigation: any, index: any) {
        var $total = navigation.find("li").length;
        var $current = index + 1;
        var $wizard = navigation.closest(".card-wizard");
        // If it's the last tab then hide the last button and show the finish instead
        if ($current >= $total) {
          $($wizard).find(".btn-next").hide();
          $($wizard).find(".btn-finish").show();
        } else {
          $($wizard).find(".btn-next").show();
          $($wizard).find(".btn-finish").hide();
        }
        let button_text = navigation
          .find("li:nth-child(" + $current + ") a")
          .html();
        setTimeout(function () {
          $(".moving-tab").html(button_text);
        }, 150);
        var checkbox = $(".footer-checkbox");
        if (index == 0) {
          $(checkbox).css({
            opacity: "0",
            visibility: "hidden",
            position: "absolute",
          });
        } else {
          $(checkbox).css({
            opacity: "1",
            visibility: "visible",
          });
        }
        $total = $wizard.find(".nav li").length;
        let $li_width = 100 / $total;
        let total_steps = $wizard.find(".nav li").length;
        let move_distance = $wizard.width() / total_steps;
        let index_temp = index;
        let vertical_level = 0;
        let mobile_device = $(document).width() < 600 && $total > 3;
        if (mobile_device) {
          move_distance = $wizard.width() / 2;
          index_temp = index % 2;
          $li_width = 50;
        }
        $wizard.find(".nav li").css("width", $li_width + "%");
        let step_width = move_distance;
        move_distance = move_distance * index_temp;
        $current = index + 1;
        // if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
        //     move_distance -= 8;
        // } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
        //     move_distance += 8;
        // }
        if (mobile_device) {
          let x: any = index / 2;
          vertical_level = parseInt(x);
          vertical_level = vertical_level * 38;
        }
        $wizard.find(".moving-tab").css("width", step_width);
        $(".moving-tab").css({
          transform:
            "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
          transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)",
        });
      },
    });
    // Prepare the preview for profile picture
    $("#wizard-picture").change(function () {
      const input = $(this);
      if (input[0].files && input[0].files[0]) {
        const reader: any = new FileReader();
        reader.onload = function (e: FileReaderEvent) {
          $("#wizardPicturePreview")
            .attr("src", e.target.result)
            .fadeIn("slow");
        };
        reader.readAsDataURL(input[0].files[0]);
      }
    });
    $('[data-toggle="wizard-radio"]').click(function () {
      let wizard = $(this).closest(".card-wizard");
      wizard.find('[data-toggle="wizard-radio"]').removeClass("active");
      $(this).addClass("active");
      $(wizard).find('[type="radio"]').removeAttr("checked");
      $(this).find('[type="radio"]').attr("checked", "true");
    });
    $('[data-toggle="wizard-checkbox"]').click(function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).find('[type="checkbox"]').removeAttr("checked");
      } else {
        $(this).addClass("active");
        $(this).find('[type="checkbox"]').attr("checked", "true");
      }
    });
    $(".set-full-height").css("height", "auto");
  }
  ngAfterViewInit() {
    $(window).resize(() => {
      $(".card-wizard").each(function () {
        const $wizard = $(this);
        const index = $wizard.bootstrapWizard("currentIndex");
        let $total = $wizard.find(".nav li").length;
        let $li_width = 100 / $total;
        let total_steps = $wizard.find(".nav li").length;
        let move_distance = $wizard.width() / total_steps;
        let index_temp = index;
        let vertical_level = 0;
        let mobile_device = $(document).width() < 600 && $total > 3;
        if (mobile_device) {
          move_distance = $wizard.width() / 2;
          index_temp = index % 2;
          $li_width = 50;
        }
        $wizard.find(".nav li").css("width", $li_width + "%");
        let step_width = move_distance;
        move_distance = move_distance * index_temp;
        let $current = index + 1;
        if ($current == 1 || (mobile_device == true && index % 2 == 0)) {
          move_distance -= 8;
        } else if (
          $current == total_steps ||
          (mobile_device == true && index % 2 == 1)
        ) {
          move_distance += 8;
        }
        if (mobile_device) {
          let x: any = index / 2;
          vertical_level = parseInt(x);
          vertical_level = vertical_level * 38;
        }
        $wizard.find(".moving-tab").css("width", step_width);
        $(".moving-tab").css({
          transform:
            "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
          transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)",
        });
        $(".moving-tab").css({
          transition: "transform 0s",
        });
      });
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    const input = $(this);
    if (input[0].files && input[0].files[0]) {
      const reader: any = new FileReader();
      reader.onload = function (e: FileReaderEvent) {
        $("#wizardPicturePreview").attr("src", e.target.result).fadeIn("slow");
      };
      reader.readAsDataURL(input[0].files[0]);
    }
  }
  // isAdmin(): Boolean {
  //   if (this.userDetails.role === "admin") {
  //     return false;
  //   }
  //   return true;
  // }
  open(content) {
    this.modalService.open(content);
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
