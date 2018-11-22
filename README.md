# nextStage-project


## Description
NextStage is an app that transforms small places - like a living room or a vintage shop - and turns them into a captivating venue for secret shows. The app creates a bridge between the host and the artist and it allows music lovers to enjoy an exciting evening.


## User Stories
We have three types of users:
Host = person that offers their house/shop for gigs.
Artist = bands/player/singer that need a place to perform.
Attendee = person that wants to attend the event. 

- **404** - As a user I want to see a  404 page when the page doesn’t exist.
- **500** - As a user I want to see an error page when it’s a server error.
- **homepage** - As a user I want a homepage that displays a description of the service and the list of current events.
 
- **sign up** - (Host) - as a host I want to sign up so I can offer my place.
- **sign up** - (Artist) - as an artist  I want to sign up so I can pick a location for my gig.
- **sign up** -(Attendee) - as an attendee I want a signup page so I can register for an event.
 
- **login** - (Host) as a host I want to log in to create, check my profile & accept requests by the artist.
- **login** - (Artist) - as an artist I want to log in to create, check my profile and send requests to the host.
- **login** - (Attendee) - as an attendee  I want to see the list of events I registered for.
- **logout** - as a user I also want to logout.
 
- **Host List Page** -  as an artist, I want to see the list of places I can pick for my gig.
- **Request Page** -  as a host, I want to see which artist wants to book my place and I want to be able to accept or reject their enquiry. 
- **Next Show page**  - as an artist, I want to see whether my request was accepted and, if so, I want to see the list of events I am going to run. 
- **Event Tickets** - As an attendee I want to book my seat and see how many tickets are available. 


## Backlog
List of features outside of the MVP scope:
- Extend the app to artists other than musicians (designers, youtubers, writers, etc.).
- Sell tickets for events and split the return among the host, artists and service provider.
- Payment method.
- Attendee can buy up to 5 tickets per event.
- Attendee can leave reviews and create a personal list of favourite artists.
- Attendee will receive an email reminder the day before the event, where they will finally discover the performer’s name.
- To improve CX experience and design.
- The host will need to pass some quality checks (room capacity, safety in the building, facilities for people with disabilities, etc.) before hosting an event. 
- Recommendations based on geolocation.
- Edit password and delete account.
- Default images of cities.

## Routes
Homepage (GET) - /

-**Login**-  - /auth/login
- GET
If user is logged in, display /.
- POST
If attendee is logged in, display /.
If artist is logged in, display artist/:artistId.
If host is logged in, display host/:hostId.
if user is not logged in & type of user is attendee, then log in and redirects to homepage.
Body (email, password)
if user is not logged in & type of user is artist, then log in and redirects to artist profile.
Body (email, password)
if user is not logged in & type of user is , then log in and redirects to host profile.
Body (email, password)
 
-**Signup**- -/auth/signup
- GET
If logged in redirects to /. 
- POST
If logged in redirects to /. Check whether the user already exists, and if not, create profile. 
Body (email, password)
 
-**Become a Host**- -/auth/host
- GET
If logged in redirects to /host/:hostId
- POST
If logged in redirects to /host/:hostId. Check whether the user already exists, and if not, create profile. 
Body (email, password, city, address, phone, room capacity, images)
 
-**Perform**- -/auth/artist
- GET
If logged in redirects to /artist/:artistId
- POST
You cannot be logged in already. Check whether the user already exists, and if not, create profile.
Body (email, password, band name, genre, social media links)
 
-**Logout**- -/auth/logout
- POST
You have to be logged in, if not redirects to /. 
Body (empty)
 
-**Request**- /request/:requestId/
- GET 
if they are logged in, they can see who requested their place. Check if the id exists and is valid.
params(:requestId)
 
-**Request Accepted**- /request/:requestId/accept
- POST 
they can accept the requests, if they are logged in and they are the host. Once the request gets accepted, the event is created. Check if the id exists and is valid.
params(:requestId)
 
-**Request Declined**- /request/:requestId/decline
- POST 
they can decline the requests, if they are logged in and they are the host. Check if the id exists and is valid.
params(:requestId)
 
-**Host list**- /hosts
- GET 
if they are logged, they can see the hosts list. This page will be accessed only by existing artists. 
 
-**Request Start**- /request/:hostId/
- POST
if they are logged in, if the one that is making the request is an artist and that artist has not done this request before and it has not been declined already. 
param (hostId)
 
-**Next Shows**- /nextShow
- GET 
if they are logged in, if they are existing artists, if their request was accepted and if that’s the existing artist performance. 
 
-**404**- (all)
- GET
 
-**500**- (all)
- GET 


## Models

Host
```
Email: string, required, unique
Password: string, required
City: string, required
Address: string, required
Phone: number, required
Room capacity: number, required
Images: string
Schedule time: date
```
Artist
```
Email: string, required, unique
Password: string, required
Band name: string
Genre: string, required, enum[‘Rock’, ‘Jazz’, ...]
Social Media Links: link
```

Attendee
```
Email: string, required, unique
Password: string, required
```
Request
```
Host: ObjectId, ref: Host
Artist: ObjectId, ref: Artist
Status: string, enum[pending, accepted]
```
 
Events
```
Attendee: ObjectId, ref: Attendee
Date: date
City: string
Artist: ObjectId, ref: Artist
Host: ObjectId, ref: Host
```

## Links

### Git

### Slides




 

