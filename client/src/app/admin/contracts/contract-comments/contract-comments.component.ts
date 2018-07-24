import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { User } from '../../../models/user';
import { Comment } from '../../../models/comment';
import { Contract } from '../../../models/contract';
import { UserService } from '../../../service/user.service';
import { CommentService } from '../../../service/comment.service';
import Swal from 'sweetalert2';
import { formatDate } from 'ngx-bootstrap/chronos';
import { getLocaleDateTimeFormat } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-contract-comments',
  templateUrl: './contract-comments.component.html',
  styleUrls: ['./contract-comments.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: '#F5F5DC', opacity: 0.5 }),
        animate(1000, style({ backgroundColor: 'white', opacity: 1 }))
      ])
    ]
    )],
})

export class ContractCommentsComponent implements OnInit {
  modalRef: BsModalRef;
  @Input() contractId1: string;
  users = [];
  loggedInUser = {
    id: '',
    email: ''
  };
  currentUser: User;
  commentModal: Comment;
  comments: Comment[];
  isShown: Array<boolean>;
  replyComment: string;
  active: boolean;
  constructor(public userService: UserService, public commentService: CommentService, private modalService: BsModalService) {
    this.users = [];
    this.currentUser = new User;
    this.commentModal = new Comment();
    this.isShown = [];
    this.replyComment = '';
    this.active = true;
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    this.userService.getUsers().subscribe(data => {
      this.commentService.getComments(this.contractId1).subscribe(result => {
        if (result !== null) {
          result.forEach(element => {
            this.users.push(element);
            this.isShown.push(false);
          });
          this.users.forEach(element => {
            element.reply.forEach(element1 => {
              if (!element1.hasOwnProperty('_id')) {
                element.reply.splice((element.reply.findIndex(reply => reply === null)), 1);
              }
            });
          });
        }
      });
    });
  }

  ngOnInit() {
    this.userService.getUserByID(this.loggedInUser.id).subscribe(data => {
      this.currentUser = data;
    });
  }

  commentDeleteModal(template) {
    this.modalRef = this.modalService.show(template);
  }
  replyDeleteModal(template) {
    this.modalRef = this.modalService.show(template);
  }

  show(i) {
    this.isShown[i] = !this.isShown[i];
  }

  resetForm(form) {
    form.reset();
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
  addComment(event, isValid) {
    event.preventDefault();
    if (isValid === true) {
      this.commentModal.userId = event.target.dataset.id;
      this.commentModal.contractId = this.contractId1;
      this.commentModal.dateTime = new Date(Date.now()).toLocaleString();
      this.commentService.addComment(this.commentModal).subscribe(res => {
        if (res.err) {
          Swal('Gabim!', 'Komenti nuk u shtua', 'error');
        } else if (res.errVld) {
          let errList = '';
          res.errVld.map(error => {
            errList += `<li>${error.msg}</li>`;
          });
          const htmlData = `<div style="text-align: center;">${errList}</div>`;
          Swal({
            title: 'Kujdes!',
            html: htmlData,
            width: 750,
            type: 'info',
            confirmButtonText: 'Kthehu te forma'
          });
        } else {
          this.commentService.getComments(this.contractId1).subscribe(result => {
            result.forEach(element => {
              if (element._id === res.comment._id) {
                this.users.push(element);
              }
              if (!element.reply.hasOwnProperty('_id')) {
                element.reply.splice((this.users.findIndex(reply => reply === null)), 1);
              }
            });
          });
          this.commentModal = new Comment();
        }
      });
    }
  }

  addReply(event, isValid) {
    if (isValid === true) {
      this.commentModal._id = event.target.dataset.id;
      this.commentModal.reply.replyUserId = this.loggedInUser.id;
      this.commentModal.reply.replyDateTime = new Date(Date.now()).toLocaleString();
      this.commentModal.reply.replyComment = this.replyComment;
      this.commentService.addReply(this.commentModal._id, this.commentModal.reply).subscribe(res => {
        if (res.err) {
          Swal('Gabim!', 'Përgjigja nuk nuk u shtua', 'error');
        } else if (res.errVld) {
          let errList = '';
          res.errVld.map(error => {
            errList += `<li>${error.msg}</li>`;
          });
          const htmlData = `<div style="text-align: center;">${errList}</div>`;
          Swal({
            title: 'Kujdes!',
            html: htmlData,
            width: 750,
            type: 'info',
            confirmButtonText: 'Kthehu te forma'
          });
        } else {
          this.userService.getUserByID(this.commentModal.reply.replyUserId).subscribe(data => {
            this.users.forEach(element => {
              if (element._id === this.commentModal._id) {
                this.commentModal.reply = Object.assign(this.commentModal.reply, data);
                element.reply.push(this.commentModal.reply);
              }
            });
          });
          this.replyComment = '';
        }
      });
    }
  }

  deleteComment(event) {
    const id = event.target.dataset.id;
    this.commentService.deleteComment(id).subscribe(res => {
      if (res.err) {
        Swal('Gabim!', 'Komenti nuk nuk u fshi', 'error');
      } else {
        this.users.splice((this.users.findIndex(comment => comment._id === id)), 1);
        Swal('Sukses!', 'Komenti u fshi me sukses.', 'success');
        this.modalRef.hide();
      }
    });
  }

  deleteReply(event) {
    const commentId = event.target.dataset.id;
    const replyId = event.target.dataset.replyid;
    this.commentService.deleteReply(commentId, replyId).subscribe(res => {
      if (res.err) {
        Swal('Gabim!', 'Reply nuk nuk u fshi', 'error');
      } else {
        this.users.forEach(element => {
          if (element._id === commentId) {
            element.reply.splice((element.reply.findIndex(reply => reply._id === replyId)), 1);
          }
        });
        Swal('Sukses!', 'Reply u fshi me sukses.', 'success');
        this.modalRef.hide();
      }
    });
  }
}
