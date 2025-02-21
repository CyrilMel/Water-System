<template>
  <div class="container">
    <div class="row">
      <!-- Row 1, Card 1 -->
      <div class="col-md-3">
        <div class="card">
          <img
            src="../assets/images/test-data-image.png"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
        </div>
      </div>
      <!-- Row 2, Card 2 -->
      <div class="col-md-3">
        <div class="card">
          <img
            src="../assets/images/2test-data-image.png"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
        </div>
      </div>
      <!-- Row 3, Card 3 -->
      <div class="col-md-3">
        <div class="card">
          <img
            src="../assets/images/3test-data-image.png"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
        </div>
      </div>
      <!-- Row 4, Card 4 -->
      <div class="col-md-3">
        <div class="card">
          <img
            src="../assets/images/test-data-image4.png"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* Card styles */
.card-group {
  display: flex;
  flex-wrap: wrap;
}

.card {
  flex: 1 1 30%; /* Adjust the width of the cards */
  margin: 10px; /* Add some margin between cards */
  display: flex;
  flex-direction: column;
}

.card-img-top {
  height: 300px; /* Set a fixed height for the images */
  object-fit: contain; /* Ensure the image covers the area without distorting */
  background: linear-gradient(to bottom, #b3e0ff, white);
}

.card-body {
  flex: 1; /* Ensure the card body takes up the remaining space */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card {
    flex: 1 1 100%; /* Make cards full width on smaller screens */
  }
}
</style>