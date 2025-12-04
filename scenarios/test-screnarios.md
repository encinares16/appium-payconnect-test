
## Payconnect 2.0 Terminal App: Test Scenarios

### Feature: Authentication
**AU_001**: *should display an error when the Terminal Master Key is not injected.* <br>

``` bash
1. Launch the Payconnect application.
2. Verify Error Message: "Error Getting Keys" 
3. Exit the Payconnect application. 
```
 <br>


**AU_002**: *should allow the user to install and inject terminal master key.* <br>

``` bash
1. Check if the KeyInjector app is installed.
   1.1 KeyInjector application not found. "OR" 1.1 KeyInjector application already installed.
   1.2 Install the KeyInjector Application.
2. Launch the Key Injector application.
3. Enter Terminal master key.
   3.1 Tap the Add (+) button.
   3.2 Input Master Key.
   3.3 Tap Save button.
4. Verify KCV Value.
5. Exit the KeyInjector application.
```
 <br>

**AU_003**: *should launch and close the Payconnect app using the terminal password.* <br>

``` bash
1. Launch the Payconnect application.
2. Check if the user proceeds in the Homescreen.
   2.1. Verify Payconnect Homescreen. 
3. Exit the Payconnect application using terminal password.
```
 <br>

**AU_004**: *should prompt error message when launching the app with no internet connection*. <br>

``` bash
1. Check if Wifi connection is enabled. 
  1.1 Wifi is enabled. or 1.1 Wifi is already disabled.
2. Launch the Android Settings application.
  2.1 Go to WLAN connection and switch Off the Wifi.
  2.2 Exit the Android Settings application 
3. Launch the Payconnect application.
4. Verify Error Message: "Error Code 10001".
5. Exit the Payconnect application.
```
 <br>

### Feature: Void

**VT_001**: *should void an existing sale transaction.* <br>

``` bash
1. Launch the Payconnect application.
2. Process a sale transaction.
   2.1. Tap the Accept Payment button.
   2.2. Input the transaction amount.
   2.3. Choose the card type.
      2.3.1 Account Type: Credit
   2.4 Pay the transaction.
      2.4.1 Waiting for payment.
      2.4.2 Processing payment.
      2.4.3 Payment confirmed.
   2.5 Printing transaction receipt.		
   2.6 Extract the generated receipt.
3. Process Void Transaction.
   3.1 Tap the Void Transaction button.
   3.2 Input the trace number.
   3.2 Printing transaction receipt.
   3.3 Extract the generated receipt.
4. Exit the Payconnect application.
 ```
 <br>
 
**VT_002**: *should not void if the transaction trace number does not exist* <br>

``` bash
1. Launch the Payconnect application.
2. Process Void Transaction.
   2.1. Tap the Void Transaction button.
3. Verify Error Message.
   3.1. Assertion: "Trace number doesn't exist."
   3.2. Screenshot.
4. Exit the Payconnect application.
 ```
 <br>
