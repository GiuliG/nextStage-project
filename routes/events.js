'use strict';

const express = require('express');
const router = express.Router();
const Event = require('../models/events');
const Request = require('../models/request');

router.post('/:requestId', (req, res, next) => {
  const requestId = req.params.requestId;
  const { _id, artist, request } = req.session.currentUser;
  Request.findByIdAndUpdate(requestId, { status: 'accepted' }, { new: true })
    .then((result) => {
      console.log(result);

      res.redirect('/lists/my-requests');
    })
    // update the status of the request with this id copy from the other route
  /*    .then((request) => {
      const event = {
        hostId,
        artistId,
        requestId: id
      };
      Event.create(event)
        .then((newEvent) => {
          res.redirect('/');
        })
        .catch(next);
    }) */
    .catch(next);
});
