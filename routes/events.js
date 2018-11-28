'use strict';

const express = require('express');
const router = express.Router();
const Event = require('../models/events');
const Request = require('../models/request');

router.post('/:requestId', (req, res, next) => {
  const requestId = req.params.requestId;
  const hostId = req.session.currentUser._id;
  Request.findByIdAndUpdate(requestId, { status: 'accepted' }, { new: true })
    .then((result) => {
      console.log(result);
      const newEvent = new Event({
        hostId,
        artistId: result.artistId._id,
        requestId
      });
      newEvent.save()
        .then(() => {
          res.redirect('/lists/my-requests');
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
