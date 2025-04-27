<template>
  <div class="page-container">
    <div class="d-flex justify-content-start">
      <h2 class="fw-bold">Overview</h2>
    </div>
        <div class="table-card p-3">

            <div class="p-2 text-light-gray bg-secondary-field rounded-2">
                <span class="fw-bold">Budget Quote</span>
            </div>

            <h4 class="my-0 mt-2">Utilities Expenses</h4>
            <div class="d-flex justify-content-flex-wrap gap-3 text-nowrap align-items-center">
                <div class="col">
                    <div class="d-flex justify-content-center flex-wrap text-light-gray gap-1">
                        <div class="col-12">
                            Water
                        </div>
                        <div class="col-12">
                            Electricity
                        </div>
                        <div class="col-12">
                            Internet
                        </div>
                        <div class="col-12">
                            Salaries Expenses
                        </div>
                        <div class="col-12">
                            Advertising Expenses
                        </div>
                        <div class="col-12">
                            Repairs and Maintenance
                        </div>
                        <div class="col-12">
                            Supplies Expenses
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="d-flex justify-content-center flex-wrap gap-1">
                        <div class="col-12">
                            15,000.00
                        </div>
                        <div class="col-12">
                            15,000.00
                        </div>
                        <div class="col-12">
                            15,000.00
                        </div>
                        <div class="col-12">
                            15,000.00
                        </div>
                        <div class="col-12">
                            15,000.00
                        </div>
                        <div class="col-12">
                            15,000.00
                        </div>
                        <div class="col-12">
                            15,000.00
                        </div>
                    </div>
                </div>
            </div>

            <h4 class="my-0 mt-2">Schedule</h4>
            <div class="d-flex justify-content-flex-wrap gap-3 text-nowrap align-items-center">
                <div class="col">
                    <div class="d-flex justify-content-center flex-wrap text-light-gray gap-1">
                        <div class="col-12">
                            Date
                        </div>
                        <div class="col-12">
                            Period of Insurance
                        </div>
                        <div class="col-12">
                            Coverage
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="d-flex justify-content-center flex-wrap gap-1">
                        <div class="col-12">
                            Jan. 01, 2024 12:00 NN
                        </div>
                        <div class="col-12">
                            Jan. 01, 2024 12:00 NN - Jan. 01, 2025 12:00 NN
                        </div>
                        <div class="col-12">
                            Jan. 01, 2024 12:00 NN - Jan. 01, 2027 12:00 NN
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-flex-wrap gap-3">
                <div class="col bg-secondary-field rounded-2 d-flex flex-column justify-content-center align-items-start p-3">
                    <label class="text-secondary-gray body-3 text-light-gray">Total Expenses incurred</label>
                    <h2 class="mb-0 mt-2">₱600,000</h2>
                </div>

                <div class="col bg-secondary-field rounded-2 d-flex flex-column justify-content-center align-items-start p-3">
                    <label class="text-secondary-gray body-3 text-light-gray">Total Premium</label>
                    <h2 class="mb-0 mt-2">₱1,000,000.00</h2>
                </div>
                <div class="col bg-secondary-field rounded-2 d-flex flex-column justify-content-center align-items-start p-3">
                    <div class="d-flex justify-content-flex-wrap gap-3">
                        <div class="col">
                            <div class="d-flex justify-content-center flex-wrap gap-1">
                                <div class="col-12">
                                    <span class="text-secondary-gray body-3 p-0 d-flex gap-3 mb-0 text-light-gray">Total Amount Due</span>
                                </div>
                                <div class="col-12">
                                    <span class="text-secondary-gray body-3 p-0 d-flex gap-3 mb-0 text-light-gray">Monthly Due</span>
                                </div>
                                <div class="col-12">
                                    <span class="text-secondary-gray body-3 p-0 d-flex gap-3 mb-0 text-light-gray">Remaining Months</span>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="d-flex justify-content-center flex-wrap gap-1">
                                <div class="col-12">
                                    <h5 class="text-black mb-0 fw-normal">₱23,500.00</h5>
                                </div>
                                <div class="col-12">
                                    <h5 class="text-black mb-0 fw-normal">₱1958.33</h5>
                                </div>
                                <div class="col-12">
                                    <h5 class="text-black mb-0 fw-normal">12</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="gap-2 d-flex justify-content-start align-items-center">
                <div class="col">
                    <button type="button" class="btn btn-primary btn-lg w-100">Policy Details</button>
                </div>
                <div class="col">
                    <button type="button" class="btn bg-secondary-field text-light-gray btn-lg w-100">Summary</button>
                </div>
                <div class="col">
                    <button type="button" class="btn bg-secondary-field text-light-gray btn-lg w-100">Logs</button>
                </div>
            </div>
        </div>
        <hr class="text-light-gray m-0">
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>